import { writable } from 'svelte/store';

export const collectionIndexJump = writable(0);

export function setCollectionIndex(i: number) {
	collectionIndexJump.update(() => i);
}
