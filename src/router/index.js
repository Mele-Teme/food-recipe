import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import RefreshT from "../refresh";
import store from "../store/store";

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,

});

router.beforeEach(async (to, from, next) => {
  if (
    (to.path == "/bookmark" || to.path == "/mypage" || to.path == "/createrecipe") &&
    !store.state.user
  ) {
    return next("/login");
  }  else return next();



});
export default router;
