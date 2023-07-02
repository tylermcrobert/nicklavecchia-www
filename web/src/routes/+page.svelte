<script lang="ts">
	import { urlFor } from '$lib/sanity/client';
	import type { SiteQuery } from '$lib/sanity/queries';
	import Nav from '../components/Nav.svelte';
	export let data: SiteQuery;
</script>

<Nav />

{#each data.overview as item}
	<img src={urlFor(item).width(40).url()} alt="Nick Lavecchia" />
{/each}
