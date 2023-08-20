import { urlFor } from '$lib/sanity/client';
import getImageDimensions from './getImageDimensions';
import getSrcset from './getSrcset';
import type { ResponsiveImageConfig, ResponsiveImageProps } from './types';

export default function getImageProps({
	image,
	sizes,
	quality,
	enforcedAspect,
	color
}: ResponsiveImageConfig): ResponsiveImageProps {
	const naturalAspect = getImageDimensions(image).aspectRatio;
	const aspect = enforcedAspect || naturalAspect;

	const bgStyle = color && `background-color: ${color}`;
	const aspectStyle = `aspect-ratio: ${aspect}`;

	return {
		src: urlFor(image).url(),
		srcset: getSrcset(image, { quality, enforcedAspect }),
		sizes,
		style: [bgStyle, aspectStyle].filter((a) => a).join('; ')
	};
}
