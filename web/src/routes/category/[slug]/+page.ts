import { client } from '$lib/sanity/client';
import type { PageLoad } from './$types';
import { siteQuery, type SiteQuery } from '$lib/sanity/queries';

export const load = (async ({ params: { slug } }) => {
	const siteData: SiteQuery = await client.fetch(siteQuery);
	const categoryData = siteData.categories.find((item) => item.slug === slug);
	return { categoryData, siteData };
}) satisfies PageLoad;
