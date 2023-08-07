<script lang="ts">
	import { urlFor } from '$lib/sanity/client';
	import { DEFAULT_QUALITY } from './utils/constants';
	import getSrcset from './utils/getSrcset';
	import type { SanityImage } from './utils/types';

	export let sizes: string;
	export let image: SanityImage;

	export let enforcedAspect: number | null = null;
	export let quality = DEFAULT_QUALITY;

	$: srcset = getSrcset(image, { quality, enforcedAspect });
</script>

<link
	rel="preload"
	as="image"
	href={urlFor(image).url()}
	imagesrcset={srcset}
	imagesizes={sizes}
/>
