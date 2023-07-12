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
	import { getNavigatingType } from '$lib/util/getNavigatingType';

	export let refresh: string;

	$: ({ toModal, fromModal, lateral } = getNavigatingType($navigating));

	let wrapper: HTMLElement;
	let content: HTMLElement;
	let curtain: HTMLElement;
	let lenis: Lenis;

	function animateOut(node: HTMLElement) {
		if (lateral) {
			const fadeOutMain = {
				duration: DUR_FADE,
				ease: Power3.easeOut,
				opacity: 0
			};

			gsap.to(node, fadeOutMain);
		}

		if (fromModal) {
			const initMain = { y: '0', zIndex: 'var(--z-main-above-curtain)' };

			const slideDownMain = {
				delay: DLY_MODAL,
				duration: DUR_MODAL,
				ease: Power3.easeInOut,
				y: '100vh'
			};

			const fadeOutCurtain = {
				duration: DUR_MODAL,
				delay: DLY_CURTAIN_OUT,
				ease: Power3.easeInOut,
				opacity: 0
			};

			gsap.set(node, initMain);
			gsap.to(node, slideDownMain);
			gsap.to(curtain, fadeOutCurtain);
		}

		return { duration: 1400 };
	}

	function animateIn(node: HTMLElement) {
		if (lateral) {
			const hideMain = { opacity: 0 };
			const fadeInMain = {
				duration: DUR_FADE,
				delay: DLY_FADE,
				opacity: 1,
				ease: Power3.easeIn
			};

			gsap.set(node, hideMain);
			gsap.to(node, fadeInMain);
		}

		if (toModal) {
			const initHideCurtain = { opacity: 0 };
			const initPositionMain = {
				y: '100vh',
				zIndex: 'var(--z-main-above-curtain)'
			};

			const slideInMain = {
				delay: DLY_MODAL,
				duration: DUR_MODAL,
				ease: Power3.easeInOut,
				y: '0vh'
			};

			const fadeInCurtain = {
				duration: DUR_MODAL,
				delay: 0,
				ease: Power3.easeInOut,
				opacity: 1
			};

			gsap.set(curtain, initHideCurtain);
			gsap.set(node, initPositionMain);
			gsap.to(node, slideInMain);
			gsap.to(curtain, fadeInCurtain);
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

		z-index: var(--z-main-below-curtain);

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
