import { writable } from 'svelte/store';
import type { WorkCategory } from './sanity/queries';

type NavItem = { name: string; href: string };
type NavStore = { items: NavItem[] | null; title: string | null };

export const navStore = writable<NavStore>({ items: [], title: null });

export function setTitle(title: string) {
	navStore.update(() => ({ items: null, title }));
}

export function setCategories(categories: WorkCategory[]) {
	const otherCats = categories.map((category) => ({
		name: category.title,
		href: `/category/${category.slug}`
	}));

	const overview = { name: 'Overview', href: '/' };

	navStore.update(() => ({
		title: null,
		items: [overview, ...otherCats]
	}));
}
