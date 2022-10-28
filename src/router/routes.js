import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import myOrder from "@/pages/Center/myOrder";
import groupOrder from "@/pages/Center/groupOrder";
export default [
  {
    path: "/Center",
    component: Center,
    meta: {
      show: true,
    },
    children: [
      {
        path: "myOrder",
        component: myOrder,
      },
      {
        path: "groupOrder",
        component: groupOrder,
      },
      {
        path: "Center",
        redirect: "/Center/myOrder",
      },
    ],
  },
  {
    path: "/PaySuccess",
    component: PaySuccess,
    meta: {
      show: true,
    },
  },
  {
    path: "/Pay",
    component: Pay,
    meta: {
      show: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/Trade",
    component: Trade,
    meta: {
      show: true,
    },
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/Login",
    component: Login,
    meta: {
      show: true,
    },
  },
  {
    path: "/Register",
    component: Register,
    meta: {
      show: true,
    },
  },
  {
    path: "/ShopCart",
    component: ShopCart,
    meta: {
      show: true,
    },
  },
  {
    path: "/AddCartSuccess",
    name: "addcartsuccess",
    component: AddCartSuccess,
    meta: {
      show: true,
    },
  },
  {
    path: "/detail/:skuId",
    name: "detail",
    component: Detail,
    meta: {
      show: true,
    },
  },
  {
    path: "/home",
    component: Home,
    meta: {
      show: true,
    },
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: {
      show: true,
    },
    name: "search",
  },
  {
    path: "/login",
    component: Login,
    meta: {
      show: false,
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      show: false,
    },
  },
  //重定向
  {
    path: "*",
    redirect: "/home",
  },
];
