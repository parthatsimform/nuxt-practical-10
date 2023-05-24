export default async () => {
	const { data, error } = await useFetch("/api/car/all");
	return { data, error };
};
