import { client } from '$lib/sanity/client';
import type { PageLoad } from './$types';
import { siteQuery, type SiteQuery } from '$lib/sanity/queries';

export const load = (async ({ params: { slug } }) => {
	const data: SiteQuery = await client.fetch(siteQuery);
	const category = data.categories.find((item) => item.slug === slug);

	return category;
}) satisfies PageLoad;
