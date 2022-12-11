import { parseCookies } from "h3";
import { defineNuxtRouteMiddleware, useNuxtApp } from "#app";
import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore();
  if (process.server) {
    const { ssrContext } = useNuxtApp();
    const cookies = parseCookies(ssrContext?.event);
    if (cookies.__BDYVA_TOK51__ && cookies.logged_user) {
      const user = JSON.parse(cookies.logged_user);
      store.setUser(user);
      store.setToken(cookies.__BDYVA_TOK51__);
    }
  }
});
