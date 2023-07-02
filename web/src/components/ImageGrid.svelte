<script lang="ts">
	import { ResponsiveImage } from '../components';
	import type { SanityImage } from './ResponsiveImage/types';

	type ImageGridItem = {
		image: SanityImage;
		title: string | null;
		slug: string | null;
	};

	export let items: ImageGridItem[];
</script>

<div class="imageGrid">
	{#each items as { slug, image, title }}
		<a href={`/collection/${slug}`}>
			<ResponsiveImage {image} sizes="100px" alt="Nick Lavecchia" />
			{#if title}
				<div>{title}</div>
			{/if}
		</a>
	{/each}
</div>

<style lang="scss">
	.imageGrid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-standard);
		padding: var(--space-standard);

		:global(img) {
			display: inline-block;
			vertical-align: top;

			height: 100px;
			width: auto;
		}
	}
</style>
