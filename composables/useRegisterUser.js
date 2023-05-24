export default async (newUser) => {
	const { data: registered, error } = await useFetch("/api/user/signup", {
		method: "POST",
		body: newUser,
	});
	return { registered, error };
};
