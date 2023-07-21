<script lang="ts">
	import { ImageCollection } from '$components';
	import type { CollectionQuery } from '$lib/sanity/queries';
	import { setTitle } from '$lib/stores';

	export let data: CollectionQuery;

	setTitle(data.title);
</script>

<ImageCollection images={data.images} />
