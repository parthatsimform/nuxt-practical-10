import { createI18n } from "vue-i18n";
import en from "../locales/en.json";
import fr from "../locales/fr.json";
import gu from "../locales/gu.json";
import hi from "../locales/hi.json";

export default defineNuxtPlugin(({ vueApp }) => {
	const i18n = createI18n({
		legacy: false,
		globalInjection: true,
		locale: "en",
		messages: {
			en,
			fr,
			gu,
			hi,
		},
	});
	vueApp.use(i18n);
});
