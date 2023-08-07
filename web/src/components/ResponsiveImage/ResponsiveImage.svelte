<script lang="ts">
	import { urlFor } from '$lib/sanity/client';
	import type { SanityImage } from './utils/types';
	import getImageDimensions from './utils/getImageDimensions';
	import { onMount } from 'svelte';
	import getSrcset from './utils/getSrcset';
	import { DEFAULT_QUALITY } from './utils/constants';

	export let image: SanityImage;
	export let alt: string;

	export let aspect: number | null = null;
	export let sizes: string;
	export let quality = DEFAULT_QUALITY;
	export let color: string | undefined = undefined;

	let node: HTMLImageElement;
	let loaded = false;

	$: naturalAspect = getImageDimensions(image).aspectRatio;
	$: enforcedAspect = aspect; // rename to be more clear

	/**
	 * Create an srcset for responsive image
	 */

	$: srcset = getSrcset(image, { quality, enforcedAspect });

	/**
	 * Add inline style for img
	 */

	$: getStyle = () => {
		let styles = [];
		if (color) styles.push(`background-color: ${color}`);
		styles.push(`aspect-ratio: ${enforcedAspect || naturalAspect}`);
		return styles.join('; ');
	};

	onMount(() => (loaded = node.complete && node.naturalHeight !== 0));
</script>

<img
	src={urlFor(image).url()}
	{alt}
	{sizes}
	{srcset}
	style={getStyle()}
	class="responsiveImage"
	class:loaded
	loading="lazy"
	bind:this={node}
	on:load={() => (loaded = true)}
/>

<style>
	.responsiveImage {
		opacity: 0;
		object-fit: cover;
		background-color: var(--color-img-preload-background);
		transition: opacity 200ms ease-in;
	}

	.loaded {
		opacity: 1;
	}
</style>
