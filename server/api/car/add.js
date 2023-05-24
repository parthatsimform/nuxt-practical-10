import Axios from "axios";
export default defineEventHandler(async (event) => {
	const url = useRuntimeConfig().public.CAR_URL;
	const car = await readBody(event);
	let headers = {};
	if (process.client) {
		headers.Authorization = `Bearer ${window.localStorage.getItem(
			"token"
		)}`;
	}
	const res = await Axios.post(url, car, { headers });
	if (res.status === 201) {
		return true;
	}
	return false;
});
