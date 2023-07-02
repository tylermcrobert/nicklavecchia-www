<script lang="ts">
	import type { CollectionQuery } from '$lib/sanity/queries';
	import ResponsiveImage from '../../../components/ResponsiveImage/ResponsiveImage.svelte';

	export let data: CollectionQuery;
</script>

<div class="images">
	{#each data.images as image}
		<ResponsiveImage {image} sizes="50vh" alt="Nick Lavecchia" />
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
