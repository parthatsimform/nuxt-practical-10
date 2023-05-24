import Axios from "axios";
export default defineEventHandler(async (event) => {
	const url = useRuntimeConfig().public.USER_URL;
	const res = await Axios.get(url);
	const data = await res.data.data;
	return data;
});
