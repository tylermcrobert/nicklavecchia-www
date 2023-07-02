<script lang="ts">
	import { urlFor } from '$lib/sanity/client';
	import type { SiteQuery } from '$lib/sanity/queries';
	import Nav from '../components/Nav.svelte';
	import ResponsiveImage from '../components/ResponsiveImage/ResponsiveImage.svelte';
	export let data: SiteQuery;

	console.log(data.overview[0]);
</script>

<Nav />

{#each data.overview as item}
	<ResponsiveImage image={item} sizes="100px" alt="Nick Lavecchia" />
{/each}
