import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Adventure from "../views/Adventure/Adventure.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Adventure",
    component: Adventure
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("@/views/Tasks.vue")
  },
  {
    path: "/shop",
    name: "Shop",
    component: () => import("@/views/Shop.vue")
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("@/views/Map.vue")
  },
  {
    path: "/land",
    name: "Land",
    component: () => import("@/views/Land.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach(transition => {
  setTimeout(() => {
    const elm = document?.getElementById("app-content");
    if (elm) {
      elm.focus();
    }
  }, 1000);
});

export default router;
