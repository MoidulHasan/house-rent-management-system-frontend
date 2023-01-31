import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from "#app";
import { useAuthStore } from "../stores/auth.store";

export default defineNuxtRouteMiddleware((to, from) => {
	const store = useAuthStore();

	if (store.authenticated !== true) return navigateTo("/login");

	const isAdminRoute = to.path.includes("admin");

	if (isAdminRoute && store.user?.role !== "Admin") return navigateTo("/");

	if (!isAdminRoute && store.user.role === "Admin")
		return navigateTo("/admin");
});
