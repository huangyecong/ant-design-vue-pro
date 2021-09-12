import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress"; //引入进度条NProgress插件
import "nprogress/nprogress.css"; //NProgress样式
import NotFound from "../views/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    // component: { render: (h) => h("router-view") }, //最终的template最终都会装变成render函数，这里将<router-view></router-view>渲染在视图中
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayOut.vue"),
    redirect: "/user/login", //重定向
    children: [
      {
        path: "login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "layout" */ "../views/User/Login.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () =>
          import(/* webpackChunkName: "layout" */ "../views/User/Register.vue"),
      },
    ],
  },
  // dashboard
  {
    path: "/",
    name: "BasicLayout",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "analysis",
            name: "Analysis",
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              ),
          },
        ],
      },
    ],
  },
  // form
  {
    path: "/form",
    name: "Form",
    component: { render: (h) => h("router-view") },
    children: [
      {
        path: "basic-form",
        name: "basicform",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/BasicForm"),
      },
      {
        path: "step-form",
        name: "stepform",
        component: () =>
          import(/* webpackChunkName: "form" */ "../views/Form/StepForm"),
        children: [
          {
            path: "info",
            name: "info",
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Form/Step1"),
          },
          {
            path: "confirm",
            name: "confirm",
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Form/Step2"),
          },
          {
            path: "result",
            name: "result",
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Form/Step3"),
          },
        ],
      },
    ],
  },
  // 404
  {
    path: "*",
    name: "404",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to.path != from.path,处理主题设置存在加载进度条的情况
  if (to.path != from.path) {
    NProgress.start();
    next(); //正常，进入下一个函数
  }
});
router.afterEach(() => {
  NProgress.done();
});

export default router;
