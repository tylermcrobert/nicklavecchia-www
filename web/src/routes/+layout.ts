import type { LayoutLoad } from './$types';

export const load = (({ url }) => {
	return { pathname: url.pathname };
}) satisfies LayoutLoad;
