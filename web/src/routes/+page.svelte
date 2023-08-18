<script lang="ts">
	import type { SiteQuery } from '$lib/sanity/queries';
	import { setNavCategories } from '$lib/stores';
	import { OverviewGrid, Seo, SidebarWrapper } from '$components';
	import ResponsivePreload from '$components/ResponsiveImage/ResponsivePreload.svelte';
	import { IMAGE_COLLECTION_IMGS_SIZES } from '../constants';

	export let data: SiteQuery;

	setNavCategories(data.categories);
</script>

<Seo title={null} />

<SidebarWrapper>
	<OverviewGrid
		items={data.overview.map((item) => ({
			image: item,
			href: '/collection/overview'
		}))}
	/>
</SidebarWrapper>

{#each data.overview as overviewImg}
	<ResponsivePreload image={overviewImg} sizes={IMAGE_COLLECTION_IMGS_SIZES} />
{/each}
