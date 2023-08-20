<script lang="ts">
	import type {
		Color,
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
	export let color: Color = undefined;

	let node: HTMLImageElement;
	let loaded = false;

	$: imgProps = getImageProps({
		image,
		quality,
		enforcedAspect,
		color,
		sizes
	});

	onMount(() => (loaded = node.complete && node.naturalHeight !== 0));
</script>

<img
	{...imgProps}
	{alt}
	class:loaded
	loading="lazy"
	bind:this={node}
	on:load={() => (loaded = true)}
/>

<style>
	img {
		opacity: 0;
		object-fit: cover;
		background-color: var(--color-img-preload-background);
		transition: opacity 200ms ease-in;
	}

	.loaded {
		opacity: 1;
	}
</style>
