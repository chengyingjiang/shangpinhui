import {
  reqGetCode,
  reqLogin,
  reqLogout,
  reqGetUserInfo,
  reqRegister,
} from "@/api";
const state = {
  code: "",
  token: localStorage.getItem("TOKEN"),
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  LOGIN(state, token) {
    state.token = token;
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  CLEAR(state) {
    state.token = "";
    state.userInfo = {};
    localStorage.removeItem("TOKEN");
  },
};
const actions = {
  async getCode({ commit }, phone) {
    const result = await reqGetCode(phone);
    if (result.code == 200) {
      commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  async login({ commit }, { phone, password }) {
    const result = await reqLogin(phone, password);
    if (result.code == 200) {
      commit("LOGIN", result.data.token);
      localStorage.setItem("TOKEN", result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  async logout({ commit }) {
    const result = await reqLogout();
    if (result.code == 200) {
      commit("CLEAR");
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  async Register({ commit }, user) {
    const result = await reqRegister(user);
    if (result.code === 200) {
      console.log("ok");
    } else if (result.code == 223) {
      return Promise.reject(result);
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  async getUserInfo({ commit }) {
    const result = await reqGetUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data);
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
