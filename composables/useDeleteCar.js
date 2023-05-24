export default async (id) => {
	const { data: deleted, error } = await useFetch("/api/car/delete", {
		method: "DELETE",
		body: id,
	});
	return { deleted, error };
};
