<script lang="ts">
	import type { SiteQuery } from '$lib/sanity/queries';
	import ImageGrid from '../components/ImageGrid.svelte';
	import Nav from '../components/Nav.svelte';
	import ResponsiveImage from '../components/ResponsiveImage/ResponsiveImage.svelte';
	export let data: SiteQuery;
</script>

<Nav />

<ul>
	{#each data.categories as category}
		<li>
			<a href={`/category/${category.slug}`}>{category.title}</a>
		</li>
	{/each}
</ul>

<ImageGrid>
	{#each data.overview as item}
		<ResponsiveImage image={item} sizes="100px" alt="Nick Lavecchia" />
	{/each}
</ImageGrid>
