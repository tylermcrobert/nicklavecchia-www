<script lang="ts">
	import { ResponsiveImage } from '../components';
	import type { SanityImage } from './ResponsiveImage/types';

	type ImageGridItem = {
		image: SanityImage | null;
		imageSrc?: string;
		title: string | null;
		href: string | null;
	};

	export let items: ImageGridItem[];
	export let type: 'inline' | 'grid' = 'inline';
</script>

<div class={`imageGrid ${type}`}>
	{#each items as { href, image, title, imageSrc }}
		<a {href} class="gridItem">
			{#if image}
				<ResponsiveImage {image} sizes="100px" alt="Nick Lavecchia" />
			{:else if imageSrc}
				<img src={imageSrc} alt="Nick Lavecchia" />
			{/if}

			<!-- asdf -->
			{#if title}
				<div>{title}</div>
			{/if}
		</a>
	{/each}
</div>

<style lang="scss">
	.imageGrid {
		gap: var(--space-large) var(--space-standard);
		padding: var(--space-standard);
		padding-top: var(--space-large);

		:global(img) {
			margin-bottom: var(--space-standard);
		}

		&.grid {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
		}

		&.inline {
			display: flex;
			flex-wrap: wrap;

			:global(img) {
				display: inline-block;
				vertical-align: top;

				height: 100px;
				width: auto;
			}
		}
	}
</style>
