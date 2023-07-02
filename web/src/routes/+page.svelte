<script lang="ts">
	import type { SiteQuery } from '$lib/sanity/queries';
	import { ImageGrid } from '../components';

	export let data: SiteQuery;
</script>

<ul>
	{#each data.categories as category}
		<li>
			<a href={`/category/${category.slug}`}>{category.title}</a>
		</li>
	{/each}
</ul>

<ImageGrid items={data.overview} collectionSlug="overview" />
