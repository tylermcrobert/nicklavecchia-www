import { client } from '$lib/sanity/client';
import { siteQuery, type SiteQuery } from '$lib/sanity/queries';
import type { PageLoad } from './$types';

export const load = (async () => {
	const data: SiteQuery = await client.fetch(siteQuery);
	return data;
}) satisfies PageLoad;
