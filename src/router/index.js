import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
Vue.use(VueRouter);
let router = new VueRouter({
  routes,
  scrollBehavior(to, from, savePosition) {
    return {
      y: 0,
    };
  },
});
//全局守卫：前置守卫
router.beforeEach(async (to, from, next) => {
  let token = store.state.user.token;
  let name = store.state.user.name;
  if (token) {
    if (to.path == "/login") {
      next("/home");
    } else {
      if (name) {
        next();
      } else {
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          await store.dispatch("logout");
          next("/login");
        }
      }
    }
  } else {
    //未登录
    let toPath = to.path;
    if (
      toPath.indexOf("/Trade") != -1 ||
      toPath.indexOf("/Pay") != -1 ||
      toPath.indexOf("/Center") != -1
    ) {
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});
export default router;
