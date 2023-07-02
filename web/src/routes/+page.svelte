<script lang="ts">
	import type { SiteQuery } from '$lib/sanity/queries';
	import { ImageGrid, ResponsiveImage } from '../components';

	export let data: SiteQuery;
</script>

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
