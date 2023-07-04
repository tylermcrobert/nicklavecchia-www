<script lang="ts">
	import type { SiteQuery, WorkCategory } from '$lib/sanity/queries';
	import { setCategories } from '$lib/stores';
	import ImageGrid from '$components/ImageGrid.svelte';

	export let data: { categoryData: WorkCategory; siteData: SiteQuery };

	setCategories(data.siteData.categories);
</script>

<ImageGrid
	items={data.categoryData.projects.map((item) => ({
		image: item.featured,
		title: item.title,
		href: `/collection/${item.slug}`
	}))}
/>
