import imports from "@/utils/imports";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/home.vue"),
    },
    {
      path: "/account/login",
      name: "login",
      component: () => import("../views/account/login.vue"),
    },
    {
      path: "/account/register",
      name: "register",
      component: () => import("../views/account/register.vue"),
    },
    {
      path: "/account",
      name: "account",
      component: () => import("../views/account/account.vue"),
    },
    {
      path: "/account/favorite-products",
      name: "favoriteProducts",
      component: () => import("../views/account/favoriteProducts.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../components/shared/loading.vue"),
    },
  ],
});

const { VITE_PROJECT_TITLE } = import.meta.env;

router.beforeEach((to, from, next) => {
  if (!to.name) return router.back();

  const { client } = imports();
  document.title = VITE_PROJECT_TITLE;

  client.changeTitle({ name: to.name as string });

  next();
});

export default router;
