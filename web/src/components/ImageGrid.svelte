<script lang="ts">
	import { ResponsiveImage } from '$components';
	import { setCollectionIndex } from '$lib/stores';
	import type { SanityImage } from './ResponsiveImage/types';

	type ImageGridItem = {
		image: SanityImage | null;
		imageSrc?: string;
		title: string | null;
		href: string | null;
	};

	export let enableJump = false;
	export let items: ImageGridItem[];
	export let type: 'inline' | 'grid' = 'inline';

	function handleJump(i: number) {
		if (!enableJump) return;
		setCollectionIndex(i);
	}
</script>

<div class={`imageGrid ${type}`}>
	{#each items as { href, image, title, imageSrc }, i}
		<a {href} class="gridItem" on:click={() => handleJump(i)}>
			{#if image}
				<ResponsiveImage {image} sizes="10vw" alt="Nick LaVecchia" />
			{:else if imageSrc}
				<img src={imageSrc} alt="Nick LaVecchia" />
			{/if}

			{#if title}
				<div>{title}</div>
			{/if}
		</a>
	{/each}
</div>

<style lang="scss">
	.imageGrid {
		gap: var(--space-standard);
		padding: var(--space-standard);
		padding-top: var(--space-large);

		&.grid {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			gap: var(--space-large) var(--space-standard);

			:global(img) {
				margin-bottom: var(--space-standard);
			}
		}

		&.inline {
			display: flex;
			flex-wrap: wrap;

			:global(img) {
				display: inline-block;
				vertical-align: top;

				height: 10vw;
				width: auto;
			}
		}
	}
</style>
