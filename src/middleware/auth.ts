import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from "#app";
import { useAuthStore } from "../stores/auth.store";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useAuthStore();

  if (!store.authenticated) return navigateTo("/login");
});
