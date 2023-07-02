<script lang="ts">
	import type { WorkCategory } from '$lib/sanity/queries';
	import ImageGrid from '../../../components/ImageGrid.svelte';

	export let data: WorkCategory;
</script>

<ImageGrid
	items={data.projects.map((item) => ({
		image: item.featured,
		title: item.title,
		href: `/collection/${item.slug}`
	}))}
/>
