<script lang="ts">
	import type {
		EnforcedAspect,
		Quality,
		SanityImage,
		Sizes
	} from './utils/types';
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps';

	export let image: SanityImage;
	export let alt: string;
	export let sizes: Sizes;

	export let enforcedAspect: EnforcedAspect = undefined;
	export let quality: Quality = undefined;

	let node: HTMLImageElement;
	let loaded = false;

	$: imgProps = getImageProps({
		image,
		quality,
		enforcedAspect,
		sizes
	});

	onMount(() => (loaded = node.complete && node.naturalHeight !== 0));
</script>

<img
	{...imgProps}
	{alt}
	class="responsive-image"
	style:opacity={loaded ? '' : '0'}
	loading="lazy"
	bind:this={node}
	on:load={() => (loaded = true)}
/>
