import Axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => ({
		isLoggedIn: null,
		loading: true,
		user: {
			name: "",
			email: "",
			password: "",
			cPassword: "",
			role: "",
			gender: "",
			age: "",
			dob: "",
		},
	}),
	persist: true,
	actions: {
		async initialize() {
			this.isLoggedIn = await JSON.parse(
				localStorage.getItem("isLoggedIn")
			);
		},
		logOut() {
			if (process.client) {
				localStorage.setItem("isLoggedIn", false);
				localStorage.removeItem("token");
				this.isLoggedIn = false;
			}
		},
	},
});
