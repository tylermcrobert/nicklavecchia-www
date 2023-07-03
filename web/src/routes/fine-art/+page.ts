import type { PageLoad } from './$types';
import Client from 'shopify-buy';

export const load = (async () => {
	const shopifyClient = Client.buildClient({
		storefrontAccessToken: 'a641150bebc3d0f1b2f12af0a7945df9',
		domain: 'nick-lavecchia-editions.myshopify.com',
		apiVersion: '2023-04'
	});

	const collections = await shopifyClient.collection.fetchAllWithProducts({
		productsFirst: 250
	});

	return { items: collections[0].products };
}) satisfies PageLoad;
