<script lang="ts">
	import { ResponsiveImage } from '../components';
	import type { SanityImage } from './ResponsiveImage/types';

	export let items: SanityImage[];
	export let collectionSlug: string;
</script>

<div class="imageGrid">
	{#each items as item}
		<a href={`/collection/${collectionSlug}`}>
			<ResponsiveImage image={item} sizes="100px" alt="Nick Lavecchia" />
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
