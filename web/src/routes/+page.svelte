<script lang="ts">
	import type { SiteQuery } from '$lib/sanity/queries';
	import { setNavCategories } from '$lib/stores';
	import { ImageGrid } from '$components';
	import Seo from '$components/Seo.svelte';

	export let data: SiteQuery;

	setNavCategories(data.categories);
</script>

<Seo title={null} />

<ImageGrid
	enableJump
	items={data.overview.map((item) => ({
		image: item,
		title: null,
		href: '/collection/overview'
	}))}
/>
