<script lang="ts">
	import type ShopifyBuy from 'shopify-buy';
	import { ImageGrid } from '$components';
	import { setTitle } from '$lib/stores';
	import Seo from '$components/Seo.svelte';

	export let data: { items: ShopifyBuy.Product[] };

	setTitle('Editions');
</script>

<Seo title="Fine Art" />

<ImageGrid
	type="grid"
	items={data.items.map((item) => ({
		title: item.title,
		href: `/fine-art/${item.handle}`,
		image: null,
		imageSrc: `${item.images[0].src}&width=200&quality=70`
	}))}
/>
