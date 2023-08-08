<script lang="ts">
	import type ShopifyBuy from 'shopify-buy';
	import { ImageGrid, ImageGridItem, Seo } from '$components';
	import { setTitle } from '$lib/stores';

	export let data: { items: ShopifyBuy.Product[] };

	setTitle('Editions');

	function getShopifyAspect(image: ShopifyBuy.Image) {
		if (!image.width || !image.height) return 'auto';
		const aspect = image.width / image.height;
		return Math.round(aspect * 100) / 100;
	}
</script>

<Seo title="Fine Art" />

<ImageGrid>
	{#each data.items as { handle, title, images }}
		<ImageGridItem {title} href={`/fine-art/${handle}`}>
			<img
				src={`${images[0].src}&width=960`}
				alt={title}
				style:aspect-ratio={getShopifyAspect(images[0])}
			/>
		</ImageGridItem>
	{/each}
</ImageGrid>
