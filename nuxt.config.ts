// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		pageTransition: { name: "route", mode: "out-in" },
	},
	modules: ["@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt"],
	runtimeConfig: {
		public: {
			STAGING: "http://api.staging.com",
			PRODUCTION: "http://api.production.com",
			DEVELOPMENT: "http://api.staging.com",
			CAR_URL: "https://testapi.io/api/dartya/resource/cardata",
			USER_URL: "https://testapi.io/api/dartya/resource/users",
		},
	},
});
