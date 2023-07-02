<script lang="ts">
	import type ShopifyBuy from 'shopify-buy';
	import { ImageGrid } from '../../components';

	export let data: { items: ShopifyBuy.Product[] };
</script>

<ImageGrid
	type="grid"
	items={data.items.map((item) => ({
		title: item.title,
		href: `/fine-art/${item.handle}`,
		image: null,
		imageSrc: `${item.images[0].src}&width=200&quality=70`
	}))}
/>
