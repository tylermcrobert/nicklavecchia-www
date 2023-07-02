<script lang="ts">
	import type { SiteQuery } from '$lib/sanity/queries';
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

{#each data.overview as item}
	<ResponsiveImage image={item} sizes="100px" alt="Nick Lavecchia" />
{/each}

<style>
	:global(img) {
		height: 100px;
	}
</style>
