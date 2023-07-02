import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from '../../components/ResponsiveImage/types';

export const client = createClient({
	projectId: '4kvint4g',
	dataset: 'production',
	useCdn: true,
	apiVersion: '2023-05-19'
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
	return builder.image(source);
}
