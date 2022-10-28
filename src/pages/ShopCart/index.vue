<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(item, index) in cartInfoList"
          :key="item.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              @change="checkItem(item)"
              :checked="item.isChecked"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeItemNum(item, -1)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              class="itxt"
              @change="
                changeItemNum(item, $event.target.value * 1 - item.skuNum)
              "
              :value="item.skuNum"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeItemNum(item, 1)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteItem(item)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="checkAllItem"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:" @click="deleteAllCheckedItems">删除选中的商品</a>
        <a href="javascript:">移到我的关注</a>
        <a href="javascript:">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalCount }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalCount() {
      // 使用reduce进行累计/累加的操作
      return this.cartInfoList.reduce((pre, item) => {
        return item.isChecked === 1 ? pre + item.skuNum : pre;
      }, 0);
    },
    totalPrice() {
      return this.cartInfoList.reduce((pre, item) => {
        return item.isChecked === 1 ? pre + item.skuNum * item.cartPrice : pre;
      }, 0);
    },
    isAllChecked() {
      // arr.every(): 判断所有的元素是否都满足条件
      return (
        this.cartInfoList.length > 0 &&
        this.cartInfoList.every((item, index) => item.isChecked === 1)
      );
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    /* 
      异步获取购物车数据列表
      */
    getData() {
      this.$store.dispatch("getCartList");
    },
    /* 
      异步改变购物项的数量
      */
    changeItemNum: throttle(async function (item, numChange) {
      const { skuNum, skuId } = item;
      if (skuNum + numChange > 0) {
        await this.$store.dispatch("addToCart", { skuId, skuNum: numChange });
        this.getData();
      }
    }, 1000),
    /* 
      异步改变购物项的勾选状态
      */
    async checkItem(item) {
      let { skuId, isChecked } = item;
      isChecked = isChecked === 1 ? 0 : 1;
      try {
        await this.$store.dispatch("checkCartItem", { skuId, isChecked });
        this.getData();
      } catch (error) {
        alert(error.message || "勾选购物项失败");
      }
    },
    async checkAllItem(event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("checkAllItem", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    /* 
      异步删除指定购物项
      */
    async deleteItem(item) {
      if (window.confirm("确定要删除吗?")) {
        try {
          await this.$store.dispatch("deleteCartItem", item.skuId);
          this.getData();
        } catch (error) {
          alert(error.message || "删除购物项失败");
        }
      }
    },
    /* 
      删除所有选中的购物项
      */
    async deleteAllCheckedItems() {
      try {
        await this.$store.dispatch("deleteAllCheckedItems");
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>