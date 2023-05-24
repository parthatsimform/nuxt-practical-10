export default async (car) => {
	const { data: added, error } = await useFetch("/api/car/add", {
		method: "POST",
		body: car,
	});
	return { added, error };
};
