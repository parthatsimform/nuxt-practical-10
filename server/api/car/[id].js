import Axios from "axios";
export default defineEventHandler(async (event) => {
	const url = useRuntimeConfig().public.CAR_URL;
	const { id } = event.context.params;
	let headers = {};
	let data = {};
	if (process.client) {
		headers.Authorization = `Bearer ${window.localStorage.getItem(
			"token"
		)}`;
	}
	const res = await Axios.get(`${url}/${id}`, { headers });
	data = await res.data;
	return data;
});
