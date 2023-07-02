import groq from 'groq';
import type { SanityImage } from '../../components/ResponsiveImage/types';

export const siteQuery = groq`
  *[_type  == 'site'][0]{
    'overview': overview->images,
    categories[]-> {
      'slug': slug.current,
      title,
      'projects': collections[]-> {
        featured,
        images,
        "slug": slug.current,
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
	};
};
