<script lang="ts">
	import { urlFor } from '$lib/sanity/client';
	import { IMG_DEVICE_SIZES } from './sizes';
	import type { SanityImage } from './types';
	import getImageDimensions from './getImageDimensions';
	import { onMount } from 'svelte';

	/**
	 * Halfway through standard and retna
	 */
	const RESOLUTION = 1.5;

	export let image: SanityImage;
	export let alt: string;

	export let aspect: number | undefined = undefined;
	export let sizes: string;
	export let quality = 75;
	export let color: string | undefined = undefined;

	let node: HTMLImageElement;
	let loaded = false;

	$: naturalAspect = getImageDimensions(image).aspectRatio;
	$: enforcedAspect = aspect; // rename to be more clear

	/**
	 * Create an srcset for responsive image
	 */

	$: srcset = IMG_DEVICE_SIZES.map((size) => {
		let builder = urlFor(image).width(size).auto('format').quality(quality);

		if (enforcedAspect) {
			builder = builder.height(Math.round(size / enforcedAspect));
		}

		return `${builder.url()} ${Math.round(size / RESOLUTION)}w`;
	}).join(', ');

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
