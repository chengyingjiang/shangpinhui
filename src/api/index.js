//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockRequest";
//三级联动接口
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () =>
  requests.get("/product/getBaseCategoryList");
export const reqGetBannerList = () => mockRequests.get("/banner");
export const reqGetFloorList = () => mockRequests.get("/floor");
export const reqGetSearchInfo = (params) =>
  requests({
    url: "/list",
    method: "post",
    data: params,
  });
export const reqGoodsInfo = (skuId) =>
  requests({
    url: `/item/${skuId}`,
    method: "get",
  });
export const reqAddToCart = (skuID, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuID}/${skuNum}`,
    method: "post",
  });
export const reqCartList = () =>
  requests({
    url: "/cart/cartList",
    method: "get",
  });
export const reqCheckCartItem = (skuID, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: "get",
  });
export const reqDeleteCartItem = (skuId) =>
  requests.delete(`/cart/deleteCart/${skuId}`);
export const reqGetCode = (phone) =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
export const reqLogin = (phone, password) =>
  requests({
    url: "/user/passport/login",
    data: {
      phone,
      password,
    },
    method: "post",
  });
export const reqLogout = () =>
  requests({
    url: "/user/passport/logout",
    method: "get",
  });
export const reqRegister = (data) =>
  requests({
    url: "/user/passport/register",
    data,
    method: "post",
  });
export const reqGetUserInfo = () =>
  requests.get("/user/passport/auth/getUserInfo");
export const reqUserAddress = () =>
  requests.get("/user/userAddress/auth/findUserAddressList");
export const reqTradeInfo = () => requests.get("/order/auth/trade");
export const reqMyOrders = (page, limit) =>
  requests.get(`/order/auth/${page}/${limit}`);
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    method: "post",
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
  });
export const reqPayInfo = (orderId) =>
  requests.get(`/payment/weixin/createNative/${orderId}`);
export const reqOrderStatus = (orderId) =>
  requests.get(`/payment/weixin/queryPayStatus/${orderId}`);
