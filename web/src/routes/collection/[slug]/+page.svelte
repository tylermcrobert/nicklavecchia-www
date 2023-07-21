<script lang="ts">
	import { ImageCollection } from '$components';
	import type { CollectionQuery } from '$lib/sanity/queries';
	import { collectionIndexJump, setTitle } from '$lib/stores';

	export let data: CollectionQuery;

	$: arrangedImages = data.images
		.slice($collectionIndexJump)
		.concat(data.images.slice(0, $collectionIndexJump));

	setTitle(data.title);
</script>

<ImageCollection images={arrangedImages} />
