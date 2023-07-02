import { client } from '$lib/sanity/client';
import type { PageLoad } from './$types';
import { collectionQuery } from '$lib/sanity/queries';

export const load = (async ({ params: { slug } }) => {
	const data = await client.fetch(collectionQuery, { slug });
	return data;
}) satisfies PageLoad;
