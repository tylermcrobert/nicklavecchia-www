import { shopifyClient } from '$lib/shopify';
import type { PageLoad } from './$types';

export const load = (async ({ params: { slug } }) => {
	const product = await shopifyClient.product.fetchByHandle(slug);
	return { product };
}) satisfies PageLoad;
