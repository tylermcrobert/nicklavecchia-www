<script lang="ts">
	import type ShopifyBuy from 'shopify-buy';
	import { ImageGrid, ImageGridItem, Seo } from '$components';
	import { setTitle } from '$lib/stores';

	export let data: { items: ShopifyBuy.Product[] };

	setTitle('Editions');
</script>

<Seo title="Fine Art" />

<ImageGrid>
	{#each data.items as { handle, title, images }}
		<ImageGridItem {title} href={`/fine-art/${handle}`}>
			<img src={images[0].src} alt={title} />
		</ImageGridItem>
	{/each}
</ImageGrid>
