import { writable } from 'svelte/store';
import type { WorkCategory } from './sanity/queries';

type NavItem = { name: string; href: string };
type NavStore = { links: NavItem[] | null; title: string | null };

export const navStore = writable<NavStore>({ links: [], title: null });

export function setTitle(title: string) {
	navStore.update(() => ({ links: null, title }));
}

export function setNavCategories(categories: WorkCategory[]) {
	const otherCats = categories.map((category) => ({
		name: category.title,
		href: `/category/${category.slug}`
	}));

	const overview = { name: 'Overview', href: '/' };

	navStore.update(() => ({
		title: null,
		links: [overview, ...otherCats]
	}));
}
