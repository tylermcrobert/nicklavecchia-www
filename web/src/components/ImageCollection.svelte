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
		:global(img) {
			/* height: 80vh;
			width: auto; */
		}
	}
</style>
