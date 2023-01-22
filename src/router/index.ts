import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

import { useAppwrite } from "@/store/appwrite";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/newdoc",
      name: "newdoc",
      component: () => import("@/views/AddDocView.vue"),
    },
    {
      path: "/alldocs",
      name: "alldocs",
      component: () => import("@/views/AllDocsView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

router.beforeEach(async (to, _from) => {
  const store = useAppwrite();

  if ((to.name === "newdoc" || to.name === "alldocs") && !store.connected) {
    return { name: "home" };
  }
});

export default router;
