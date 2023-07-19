<script lang="ts">
	import { ResponsiveImage } from '$components';
	import type { CollectionQuery } from '$lib/sanity/queries';

	export let data: CollectionQuery;
</script>

<div class="images">
	{#each data.images as image}
		<ResponsiveImage {image} sizes="50vh" alt="Nick LaVecchia" />
	{/each}
</div>

<style lang="scss">
	.images {
		white-space: nowrap;

		:global(img) {
			height: 50vh;
			width: auto;
			display: inline-block;
		}
	}
</style>
