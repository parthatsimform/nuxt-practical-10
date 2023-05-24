export default async (car) => {
	const { edited, error } = await useFetch("/api/car/edit", {
		method: "PUT",
		body: car,
	});
	return { edited, error };
};
