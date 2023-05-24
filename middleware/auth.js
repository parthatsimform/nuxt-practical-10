import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
	const userStore = useUserStore();
	if (process.server) {
		userStore.loading = true;
		return;
	} else {
		await userStore.initialize();
		if (!userStore.isLoggedIn) {
			userStore.loading = true;
			return navigateTo("/login");
		}
		userStore.loading = false;
	}
});
