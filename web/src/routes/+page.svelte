<script lang="ts">
	import type { SiteQuery } from '$lib/sanity/queries';
	import { setNavCategories } from '$lib/stores';
	import { OverviewGrid } from '$components';
	import Seo from '$components/Seo.svelte';

	export let data: SiteQuery;

	setNavCategories(data.categories);
</script>

<Seo title={null} />

<OverviewGrid
	items={data.overview.map((item) => ({
		image: item,
		href: '/collection/overview'
	}))}
/>
