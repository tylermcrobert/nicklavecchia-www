<script lang="ts">
	import type { SiteQuery } from '$lib/sanity/queries';
	import { setCategories } from '$lib/stores';
	import { ImageGrid } from '$components';

	export let data: SiteQuery;

	setCategories(data.categories);
</script>

<ImageGrid
	items={data.overview.map((item) => ({
		image: item,
		title: null,
		href: '/collection/overview'
	}))}
/>
