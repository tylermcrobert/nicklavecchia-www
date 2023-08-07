<script lang="ts">
	import { ImageCollection } from '$components';
	import Seo from '$components/Seo.svelte';
	import type { CollectionQuery } from '$lib/sanity/queries';
	import { collectionIndexJump, setTitle } from '$lib/stores';

	export let data: CollectionQuery;

	$: rearrangedImages = data.images
		.slice($collectionIndexJump)
		.concat(data.images.slice(0, $collectionIndexJump));

	setTitle(data.title);
</script>

<Seo title={data.title} />

<ImageCollection images={rearrangedImages} />
