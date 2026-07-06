import { useSiteStore } from "~/stores/website";

export default defineNuxtRouteMiddleware((to, from) => {
    const siteStore = useSiteStore();
    const isAuthenticated = siteStore.isAuthenticated;

    if (!isAuthenticated) {
        return navigateTo('/login');
    }
})