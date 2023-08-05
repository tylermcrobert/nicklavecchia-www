<script lang="ts">
	import type { SiteQuery, WorkCategory } from '$lib/sanity/queries';
	import { setNavCategories } from '$lib/stores';
	import ImageGrid from '$components/ImageGrid.svelte';
	import Seo from '$components/Seo.svelte';

	export let data: { categoryData: WorkCategory; siteData: SiteQuery };

	setNavCategories(data.siteData.categories);
</script>

<Seo title={data.categoryData.title} />

<ImageGrid
	items={data.categoryData.projects.map((item) => ({
		image: item.featured,
		title: item.title,
		href: `/collection/${item.slug}`
	}))}
/>
