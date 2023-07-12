<script lang="ts">
	import { navigating } from '$app/stores';
	import gsap, { Power3 } from 'gsap';
	import { onMount } from 'svelte';
	import Lenis from '@studio-freight/lenis';
	import {
		DLY_MODAL,
		DUR_MODAL,
		DLY_CURTAIN_OUT,
		DUR_FADE,
		DLY_FADE
	} from '../constants';
	import { navType } from '$lib/util/navType';

	export let refresh: string;

	$: ({ toModal, fromModal, lateral } = navType($navigating));

	let wrapper: HTMLElement;
	let content: HTMLElement;
	let curtain: HTMLElement;
	let lenis: Lenis;

	function animateOut(node: HTMLElement) {
		if (fromModal) {
			gsap.set(curtain, { opacity: 1 });
			gsap.set(node, { y: '0' });

			gsap.to(node, {
				delay: DLY_MODAL,
				duration: DUR_MODAL,
				ease: Power3.easeInOut,
				y: '100vh'
			});

			gsap.to(curtain, {
				duration: DUR_MODAL,
				delay: DLY_CURTAIN_OUT,
				ease: Power3.easeInOut,
				opacity: 0
			});
		}

		if (lateral) {
			gsap.set(node, { opacity: 1 });
			gsap.to(node, {
				duration: DUR_FADE,
				ease: Power3.easeOut,
				opacity: 0
			});
		}

		return { duration: 1400 };
	}

	function animateIn(node: HTMLElement) {
		if (toModal) {
			gsap.set(curtain, { opacity: 0 });
			gsap.set(node, { y: '100vh' });

			gsap.to(node, {
				delay: DLY_MODAL,
				duration: DUR_MODAL,
				ease: Power3.easeInOut,
				y: '0vh'
			});

			gsap.to(curtain, {
				duration: DUR_MODAL,
				delay: 0,
				ease: Power3.easeInOut,
				opacity: 1
			});
		}

		if (lateral) {
			gsap.set(node, { opacity: 0 });
			gsap.to(node, {
				duration: DUR_FADE,
				delay: DLY_FADE,
				opacity: 1,
				ease: Power3.easeIn
			});
		}

		return { duration: 1400 };
	}

	/**
	 * Smooth scroll
	 */

	onMount(() => {
		lenis = new Lenis({ wrapper, content });

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});

	function handleNewNode() {
		lenis = new Lenis({ wrapper, content });
	}
</script>

{#key refresh}
	<div
		in:animateIn
		out:animateOut
		class="animate"
		bind:this={wrapper}
		on:introstart={handleNewNode}
	>
		<div bind:this={content} class="content">
			<slot />
		</div>
	</div>
{/key}

<div class="curtain" bind:this={curtain} />

<style lang="scss">
	.animate {
		position: fixed;
		left: 0;

		width: 100vw;
		height: 100vh;

		background: white;
		overflow-y: scroll;

		z-index: var(--z-main);

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.content {
		padding-top: var(--nav-height);
	}

	.curtain {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		opacity: 0;

		background: rgba(0, 0, 0, 0.3);
		pointer-events: none;
		z-index: var(--z-curtain);
	}
</style>
