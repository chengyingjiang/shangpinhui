import {
    reqGoodsInfo,
} from '@/api'
import {
    getUUID
} from '@/utils/uuid_token'
const state = {
    //home仓库中存储三级菜单的数据
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID()
}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};
const actions = {
    async getGoodsInfo({
        commit
    }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODINFO', result.data);
        }
    },
};
//简化数据而生
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    skuImageList(state) {
        return state.goodInfo.skuInfo.skuImageList || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || {}
    },
};
export default {
    state,
    actions,
    mutations,
    getters,
}