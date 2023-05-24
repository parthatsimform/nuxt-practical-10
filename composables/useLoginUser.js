export default async (email, password) => {
	const { data, error } = await useFetch("/api/user/signin");
	const allUsers = await data.value;
	let user = allUsers.find((u) => u.email == email && u.password == password);
	if (user) {
		return true;
	}
	return false;
};
