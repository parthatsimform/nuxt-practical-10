export default async (id) => {
	const { data, error } = await useFetch(`/api/car/${id}`);
	return { data, error };
};
