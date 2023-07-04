import { shopifyClient } from '$lib/shopify';
import type { PageLoad } from './$types';

export const load = (async () => {
	const collections = await shopifyClient.collection.fetchAllWithProducts({
		productsFirst: 250
	});

	return { items: collections[0].products };
}) satisfies PageLoad;
