<script lang="ts">
	import type { CollectionQuery } from '$lib/sanity/queries';
	import { setTitle } from '$lib/stores';
	import ResponsiveImage from '../../../components/ResponsiveImage/ResponsiveImage.svelte';

	export let data: CollectionQuery;

	setTitle(data.title);
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
