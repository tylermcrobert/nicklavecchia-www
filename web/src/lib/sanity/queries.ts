import groq from 'groq';

export const siteQuery = groq`
  *[_type  == 'site'][0]{
    'overview': overview->images,
    categories[]-> {
      'slug': slug.current,
      title,
      'projects': collections[]->
    }
  }
`;

export type SiteQuery = {
	overview: SanityImage[];
};

export type SanityImage = { _type: 'image' };
