<script lang="ts">
	import { navigating } from '$app/stores';
	import gsap, { Power3 } from 'gsap';
	import { onMount } from 'svelte';
	import Lenis from '@studio-freight/lenis';
	import { MODAL_ROUTES } from '../constants';

	export let refresh: string;

	let wrapper: HTMLElement;
	let content: HTMLElement;
	let lenis: Lenis;

	$: navigatingTo = $navigating?.to?.route.id || '';
	$: navigatingFrom = $navigating?.from?.route.id || '';

	$: toModal = MODAL_ROUTES.includes(navigatingTo);
	$: fromModal = MODAL_ROUTES.includes(navigatingFrom);
	$: lateral = !fromModal && !toModal;

	function animateOut(node: HTMLElement) {
		const tl = gsap.timeline();

		if (fromModal) {
			tl.set(node, { y: '0', zIndex: 100 });
			tl.to(node, {
				y: '100vh',
				delay: 0.4,
				duration: 1,
				ease: Power3.easeInOut
			});
		}

		if (lateral) {
			tl.set(node, { opacity: 1 });
			tl.to(node, {
				opacity: 0,
				duration: 0.8,
				ease: Power3.easeOut
			});
		}

		return { duration: 1400 };
	}

	function animateIn(node: HTMLElement) {
		const tl = gsap.timeline();

		if (toModal) {
			tl.set(node, { y: '100vh', zIndex: 100 });
			tl.to(node, {
				y: '0vh',
				delay: 0.4,
				duration: 1,
				ease: Power3.easeInOut
			});
		}

		if (lateral) {
			tl.set(node, { opacity: 0 });
			tl.to(node, {
				opacity: 1,
				delay: 0.4,
				duration: 0.8,
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
		<div bind:this={content}>
			<slot />
		</div>
	</div>
{/key}

<!-- <div class="curtain" /> -->

<style>
	.animate {
		position: fixed;
		top: var(--nav-height);
		left: 0;

		width: 100vw;
		height: calc(100vh - var(--nav-height));

		background: white;
		overflow-y: scroll;
	}

	/* .curtain {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;

		background: rgba(0, 0, 0, 0.3);
		pointer-events: none;
		z-index: 10;
	} */
</style>
