<script lang="ts">
	import type { SiteQuery } from '$lib/sanity/queries';
	import { setNavCategories } from '$lib/stores';
	import { OverviewGrid } from '$components';
	import Seo from '$components/Seo.svelte';
	import ResponsivePreload from '$components/ResponsiveImage/ResponsivePreload.svelte';
	import { IMAGE_COLLECTION_IMGS_SIZES } from '../constants';

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

{#each data.overview as overviewImg}
	<ResponsivePreload image={overviewImg} sizes={IMAGE_COLLECTION_IMGS_SIZES} />
{/each}
