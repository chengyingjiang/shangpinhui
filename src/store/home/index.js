import {
    reqCategoryList,
    reqGetBannerList,
    reqGetFloorList
} from "@/api";
//home模块的小仓库
const state = {
    //home仓库中存储三级菜单的数据
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor组件的数据
    floorList: []
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    CATEBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    CATEFLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
};
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({
        commit
    }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data);
        }
    },
    async getBannerList({
        commit
    }) {
        let result = await reqGetBannerList();
        if (result.code == 200) {
            commit('CATEBANNERLIST', result.data);
        }
    },
    async getFloorList({
        commit
    }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit('CATEFLOORLIST', result.data);
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}