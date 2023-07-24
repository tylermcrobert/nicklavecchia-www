import { client } from '$lib/sanity/client';
import { aboutQuery, type AboutQuery } from '$lib/sanity/queries';
import type { PageLoad } from './$types';

export const load = (async () => {
	const data: AboutQuery = await client.fetch(aboutQuery);
	return data;
}) satisfies PageLoad;
