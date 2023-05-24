export default async (car) => {
	const { added, error } = await useFetch("/api/car/add", {
		method: "POST",
		body: car,
	});
	return { added, error };
};
