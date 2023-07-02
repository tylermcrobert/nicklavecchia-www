import { client } from '$lib/sanity/client';
import { siteQuery } from '$lib/sanity/queries';
import type { PageLoad } from './$types';

export const load = (async () => {
	const allData = await client.fetch(siteQuery);
	return allData;
}) satisfies PageLoad;
