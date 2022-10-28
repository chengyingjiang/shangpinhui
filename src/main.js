import Vue from "vue";
import App from "./App.vue";
//三级联动组件---全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import { MessageBox, Message } from "element-ui";
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
//挂在原型上
Vue.prototype.$MessageBox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
import router from "@/router";
import store from "@/store";
import "@/mock/mockServe";
import "swiper/css/swiper.css";
import * as API from "@/api";

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store,
}).$mount("#app");
