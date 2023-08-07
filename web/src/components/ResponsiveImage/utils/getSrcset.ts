import { urlFor } from '$lib/sanity/client';
import { IMG_DEVICE_SIZES, IMG_SCALING } from './constants';
import type { SanityImage } from './types';

type SrcsetOptions = {
	quality: number;
	enforcedAspect: number | null;
};

/**
 * Generates srcset for responsive images.
 * @param image Sanity Image object.
 * @param options Srcset options
 * @returns Comma-separated srcset string.
 */

export default function getSrcset(
	image: SanityImage,
	{ quality, enforcedAspect }: SrcsetOptions
) {
	const srcSet = IMG_DEVICE_SIZES.map((size) => {
		// Uncommitted url builder
		let builder = urlFor(image).width(size).auto('format').quality(quality);

		// Optionally enforce an aspect ratio by modifiying the height
		if (enforcedAspect) {
			builder = builder.height(Math.round(size / enforcedAspect));
		}

		// Returns url and size from the constants file
		return `${builder.url()} ${Math.round(size / IMG_SCALING)}w`;
	}).join(', ');

	return srcSet;
}
