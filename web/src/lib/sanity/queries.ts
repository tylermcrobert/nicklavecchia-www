import groq from 'groq';
import type { SanityImage } from '$components/ResponsiveImage/types';
import type { InputValue } from '@portabletext/svelte/ptTypes';

export const siteQuery = groq`
  *[_type  == 'site'][0]{
    'overview': overview->images,
    categories[]-> {
      'slug': slug.current,
      title,
      'projects': collections[]-> {
        "slug": slug.current,
        title,
        featured,
        images,
      }
    }
  }
`;

export type SiteQuery = {
	overview: SanityImage[];
	categories: WorkCategory[];
};

export type WorkCategory = {
	slug: string;
	title: string;
	projects: {
		featured: SanityImage;
		images: SanityImage[];
		slug: string;
		title: string;
	}[];
};

/**
 * Collection
 */

export const collectionQuery = groq`
  *[_type == 'collection' && slug.current == $slug][0]{
    images,
    title
  }
`;

export type CollectionQuery = {
	images: SanityImage[];
	title: string;
};

/**
 * About
 */

export const aboutQuery = groq`
  *[_type  == 'site'][0]{
    aboutImages,
    info {
      bio,
      clients,
      contactMethods
    }
  }
`;

export type AboutQuery = {
	aboutImages: SanityImage[];
	info: {
		bio: InputValue;
		clients: string[];
		contactMethods: {
			label: string;
			url: string;
			value: string;
		}[];
	};
};
