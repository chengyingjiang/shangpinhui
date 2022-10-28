<template>
  <div class="pagination">
    <button :disabled="mcPage === 1" @click="changeCurrentPage(mcPage - 1)">
      上一页
    </button>
    <button v-if="startEnd.start > 1" @click="changeCurrentPage(1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <button
      v-for="item in startEnd.end"
      v-if="item >= startEnd.start"
      :key="item"
      @click="changeCurrentPage(item)"
      :class="{ active: mcPage === item }"
    >
      {{ item }}
    </button>

    <button v-if="startEnd.end < totalPages - 1">···</button>
    <button
      v-if="startEnd.end < totalPages"
      @click="changeCurrentPage(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="mcPage === totalPages"
      @click="changeCurrentPage(mcPage + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageNo: {
      // 当前页码
      type: Number,
      default: 1,
    },
    pageSize: {
      // 每页数量
      type: Number,
      default: 5,
    },
    total: {
      // 总数量
      type: Number,
      default: 0,
    },
    showPageNo: {
      // 连续页码数
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      mcPage: this.pageNo,
    };
  },
  computed: {
    totalPages() {
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    startEnd() {
      const { mcPage, showPageNo, totalPages } = this;
      let start = mcPage - showPageNo / 2;
      if (start < 1) {
        start = 1;
      }
      let end = start + showPageNo - 1;
      if (end > totalPages) {
        end = totalPages;
        start = end - showPageNo + 1;
        if (start < 1) {
          start = 1;
        }
      }
      return { start, end };
    },
  },
  watch: {
    currentPage(value) {
      this.mcPage = value;
    },
  },
  methods: {
    changeCurrentPage(page) {
      this.mcPage = page;
      this.$emit("currentChange", page);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>