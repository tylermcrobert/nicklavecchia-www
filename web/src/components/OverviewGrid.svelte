<script lang="ts">
	import { ResponsiveImage } from '$components';
	import { setCollectionIndex } from '$lib/stores';
	import type { SanityImage } from './ResponsiveImage/utils/types';

	type ImageGridItem = {
		image: SanityImage;
		href: string | null;
	};

	export let items: ImageGridItem[];

	function handleJump(i: number) {
		setCollectionIndex(i);
	}
</script>

<div class="imageGrid">
	{#each items as { href, image }, i}
		<a {href} class="gridItem" on:click={() => handleJump(i)}>
			<ResponsiveImage {image} sizes="10vw" alt="Nick LaVecchia" />
		</a>
	{/each}
</div>

<style lang="scss">
	@import '../styles/mixins';

	.imageGrid {
		gap: var(--space-standard);
		padding: var(--space-standard);
		padding-top: var(--space-large);

		display: grid;
		grid-template-columns: repeat(3, 1fr);
		align-items: flex-end;

		@include min-width('tablet') {
			display: flex;
			flex-wrap: wrap;

			.gridItem {
				height: 12vw;
				width: auto;
			}

			:global(img) {
				height: 100%;
			}
		}
	}
</style>
