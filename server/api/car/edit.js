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
	const res = await Axios.put(`${url}/${car.id}`, car, { headers });
	if (res.status === 200) {
		return true;
	}
	return false;
});
