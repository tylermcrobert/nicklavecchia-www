<script lang="ts" props="{{name:string}}">
	import { onMount } from 'svelte';
	import getImageProps from './utils/getImageProps';
	import type {
		EnforcedAspect,
		Quality,
		SanityImage,
		Sizes
	} from './utils/types';

	export let image: SanityImage;
	export let sizes: Sizes;
	export let alt: string;

	export let quality: Quality = undefined;
	export let enforcedAspect: EnforcedAspect = undefined;

	let imgNode: HTMLImageElement;

	$: imgProps = getImageProps({
		image,
		quality,
		enforcedAspect,
		sizes
	});

	onMount(() => {
		const options = {
			root: null, // Use the viewport as the root
			rootMargin: '100% 100% 100% 100%', // Top, right, bottom, left margins
			threshold: 0.1 // 0.1 means when 10% of the image is visible
		};

		function handleIntersection(
			entries: IntersectionObserverEntry[],
			observer: IntersectionObserver
		) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					imgNode.src = imgProps.src;
					imgNode.srcset = imgProps.srcset;
					imgNode.style.opacity = '1';

					observer.unobserve(imgNode);
				}
			});
		}

		const observer = new IntersectionObserver(handleIntersection, options);

		observer.observe(imgNode);
	});
</script>

<img
	style="{imgProps.style}; opacity: 0"
	sizes={imgProps.sizes}
	{alt}
	bind:this={imgNode}
/>
