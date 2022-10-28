import {
    reqCartList,
    reqCheckCartItem,
    reqDeleteCartItem,
    reqAddToCart
} from '@/api'
const state = {
    cartList: []
}
const mutations = {
    RECEIVECARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    /* 
    添加到购物车的异步action
    */
    async addToCart({
        commit
    }, {
        skuId,
        skuNum,
    }) {
        console.log(skuId, skuNum)
        const result = await reqAddToCart(skuId, skuNum)
        if (result.code === 200) { // 成功
            console.log('ok')
        } else { // 失败
            console.log(result.message || '添加购物车失败')
        }
    },
    /* 
  设置购物项的选中状态
  */
    async checkCartItem({
        commit
    }, {
        skuId,
        isChecked
    }) {
        const result = await reqCheckCartItem(skuId, isChecked)
        if (result.code !== 200) {
            throw new Error('勾选购物项失败')
        }
    },
    async checkAllItem({
        dispatch,
        state
    }, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let Promise = dispatch('checkCartItem', {
                skuId: item.skuId,
                isChecked
            })
            PromiseAll.push(Promise)
        })
        return Promise.all(PromiseAll)
    },
    /* 
    删除某个购物项的异步action
    */
    async deleteCartItem({
        commit
    }, skuId) {
        const result = await reqDeleteCartItem(skuId)
        return result.code === 200 ? 'ok' : Promise.reject(new Error('删除购物项失败'))
    },

    /* 
    获取购物车数据列表的异步action
    */
    async getCartList({
        commit
    }) {
        const result = await reqCartList()
        console.log(result)
        if (result.code === 200) {
            commit('RECEIVECARTLIST', result.data)
        }
    },
    //删除所有购物车数据 
    async deleteAllCheckedItems({
        dispatch,
        getters
    }) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let Promise = item.isChecked == 1 ? dispatch('deleteCartItem', item.skuId) : '';
            PromiseAll.push(Promise)
        })
        //只要全部的p1|p2...都成功，返回结果即为成功
        //如果有一个失败，返回即为失败结果
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}
export default {
    state,
    mutations,
    actions,
    getters
}