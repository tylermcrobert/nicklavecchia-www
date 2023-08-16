<script lang="ts">
	import { navigating } from '$app/stores';
	import gsap, { Power3 } from 'gsap';

	import { getNavigatingType } from '$lib/util/getNavigatingType';
	import { duration } from '../constants';

	export let refresh: string;

	$: ({ toModal, fromModal, lateral } = getNavigatingType($navigating));

	let curtain: HTMLElement;

	function animateOut(node: HTMLElement) {
		if (lateral) {
			const fadeOutMain = {
				duration: duration.medium,
				ease: Power3.easeOut,
				opacity: 0
			};

			gsap.to(node, fadeOutMain);

			return { duration: duration.medium * 1000 };
		}

		if (fromModal) {
			const initMain = { y: '0', zIndex: 'var(--z-main-above-curtain)' };

			const slideDownMain = {
				delay: duration.short,
				duration: duration.long,
				ease: Power3.easeInOut,
				y: window.innerHeight
			};

			const fadeOutCurtain = {
				duration: duration.xLong,
				delay: duration.medium,
				ease: Power3.easeInOut,
				opacity: 0
			};

			gsap.set(node, initMain);
			gsap.to(node, slideDownMain);
			gsap.to(curtain, fadeOutCurtain);
		}

		return { duration: 2000 };
	}

	function animateIn(node: HTMLElement) {
		if (lateral) {
			const hideMain = { opacity: 0 };
			const fadeInMain = {
				duration: duration.medium,
				delay: duration.short,
				opacity: 1,
				ease: Power3.easeIn
			};

			gsap.set(node, hideMain);
			gsap.to(node, fadeInMain);

			return { duration: duration.medium + duration.short };
		}

		if (toModal) {
			const initHideCurtain = { opacity: 0 };
			const initPositionMain = {
				y: window.innerHeight,
				zIndex: 'var(--z-main-above-curtain)'
			};

			const slideInMain = {
				delay: duration.medium,
				duration: duration.long,
				ease: Power3.easeInOut,
				y: '0vh'
			};

			const fadeInCurtain = {
				duration: duration.long,
				delay: 0,
				opacity: 1
			};

			gsap.set(curtain, initHideCurtain);
			gsap.set(node, initPositionMain);
			gsap.to(node, slideInMain);
			gsap.to(curtain, fadeInCurtain);
		}

		return { duration: 2000 };
	}
</script>

{#key refresh}
	<div in:animateIn out:animateOut class="animate">
		<slot />
	</div>
{/key}

<div class="curtain" bind:this={curtain} />

<style lang="scss">
	.animate {
		position: fixed;
		left: 0;
		z-index: var(--z-main-below-curtain);

		width: 100vw;
		height: var(--window-height);

		background: white;
	}

	.curtain {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: var(--window-height);
		opacity: 0;

		background: rgba(0, 0, 0, 0.4);
		pointer-events: none;
		z-index: var(--z-curtain);
	}
</style>
