import Axios from "axios";
export default defineEventHandler(async (event) => {
	const url = useRuntimeConfig().public.CAR_URL;
	const id = await readBody(event);
	let headers = {};
	if (process.client) {
		headers.Authorization = `Bearer ${window.localStorage.getItem(
			"token"
		)}`;
	}
	const res = await Axios.delete(`${url}/${id}`, { headers });
	if (res.status === 204) {
		return true;
	}
	return false;
});
