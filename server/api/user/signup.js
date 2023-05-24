import Axios from "axios";
export default defineEventHandler(async (event) => {
	const url = useRuntimeConfig().public.USER_URL;
	const newUser = await readBody(event);
	const res = await Axios.post(url, newUser);
	if (res.status === 201) {
		return true;
	}
	return false;
});
