import {
  reqTradeInfo,
  reqPayInfo,
  reqUserAddress,
} from "@/api";

const state = {
  tradeInfo: {}, // 订单交易信息对象
  payInfo: {}, // 支付信息对象
  address: [],
};

const mutations = {
  RECEIVETRADEINFO(state, tradeInfo) {
    state.tradeInfo = tradeInfo;
  },
  RECEIVEPAYINFO(state, payInfo) {
    state.payInfo = payInfo;
  },
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
};

const actions = {
  /* 
    获取订单交易信息的异步action
    */
  async getTradeInfo({ commit }) {
    const result = await reqTradeInfo();
    if (result.code === 200) {
      commit("RECEIVETRADEINFO", result.data);
    }
  },
  async getUserAddress({ commit }) {
    const result = await reqUserAddress();
    if (result.code == 200) {
      commit("GETUSERADDRESS", result.data);
    }
  },

  /* 
    获取支付信息的异步action
    */
  async getPayInfo({ commit }, orderId) {
    const result = await reqPayInfo(orderId);
    if (result.code === 200) {
      commit("RECEIVEPAYINFO", result.data);
    }
  },
};

const getters = {
  /* 
    需要支付的总金额
    */
  totalAmount(state) {
    return state.tradeInfo.totalAmount;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
