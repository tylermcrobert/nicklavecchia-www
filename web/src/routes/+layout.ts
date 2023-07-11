import type { LayoutLoad } from './$types';

export const load = (({ url, route }) => {
	const navRefresh = route.id?.replace('/category/[slug]', '/') || '/';
	return { pathname: url.pathname, navRefresh };
}) satisfies LayoutLoad;
