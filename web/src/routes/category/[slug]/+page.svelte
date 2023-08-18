<script lang="ts">
	import type { SiteQuery, WorkCategory } from '$lib/sanity/queries';
	import { setNavCategories } from '$lib/stores';
	import { ImageGrid, ImageGridItem, ResponsiveImage, Seo } from '$components';
	import SidebarWrapper from '$components/SidebarWrapper.svelte';

	export let data: { categoryData: WorkCategory; siteData: SiteQuery };

	setNavCategories(data.siteData.categories);
</script>

<Seo title={data.categoryData.title} />

<SidebarWrapper>
	<ImageGrid>
		{#each data.categoryData.projects as project}
			<ImageGridItem title={project.title} href={`/collection/${project.slug}`}>
				<ResponsiveImage
					image={project.featured}
					alt={project.title}
					sizes="25vw"
					enforcedAspect={0.8}
				/>
			</ImageGridItem>
		{/each}
	</ImageGrid>
</SidebarWrapper>
