export default async (car) => {
	const { data: edited, error } = await useFetch("/api/car/edit", {
		method: "PUT",
		body: car,
	});
	return { edited, error };
};
