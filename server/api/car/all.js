import Axios from "axios";
export default defineEventHandler(async (event) => {
	const url = useRuntimeConfig().public.CAR_URL;
	let headers = {};
	let data = {};
	if (process.client) {
		headers.Authorization = `Bearer ${window.localStorage.getItem(
			"token"
		)}`;
	}
	const res = await Axios.get(url, { headers });
	data = await res.data.data;
	return data;
});
