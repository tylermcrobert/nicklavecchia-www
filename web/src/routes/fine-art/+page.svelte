<script lang="ts">
	import type ShopifyBuy from 'shopify-buy';
	import { ImageGrid, ImageGridItem, Seo } from '$components';
	import { setTitle } from '$lib/stores';

	export let data: { items: ShopifyBuy.Product[] };

	setTitle('Editions');

	function getShopifyImageProps(image: ShopifyBuy.Image) {
		if (!image.width || !image.height) return;

		const ASPECT_LANDSCAPE = 3 / 2;
		const ASPECT_PORTRAIT = 4 / 5;

		const isLandscape = image.width > image.height;
		const aspect = isLandscape ? ASPECT_LANDSCAPE : ASPECT_PORTRAIT;

		const width = 960;
		const height = width / aspect;

		return {
			src: `${image.src}&width=${width}&height=${height}&crop=center`,
			style: `aspect-ratio: ${aspect}`
		};
	}
</script>

<Seo title="Fine Art" />

<ImageGrid>
	{#each data.items as { handle, title, images }}
		<ImageGridItem {title} href={`/fine-art/${handle}`}>
			<img {...getShopifyImageProps(images[0])} alt={title} />
		</ImageGridItem>
	{/each}
</ImageGrid>
