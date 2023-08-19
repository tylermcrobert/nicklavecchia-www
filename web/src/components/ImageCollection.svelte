<script lang="ts">
	import { ResponsiveImage } from '$components';
	import { isTouchEvent } from '$lib/util/isTouchEvent';
	import { onMount } from 'svelte';
	import type { SanityImage } from './ResponsiveImage/utils/types';
	import { IMAGE_COLLECTION_IMGS_SIZES } from '../constants';

	export let images: SanityImage[];

	const FRICTION = 0.97;
	const WHEEL_FRICTION = 1.75;
	const MOVE_SPEED = 0.1;

	let imgs: HTMLElement;
	let raf: number;

	let isDragging = false;
	let inertia = 0;
	let transformX = 0;
	let dragX = 0;
	let width = 0;

	/**
	 * Runs on rAF
	 */

	function tick() {
		raf = requestAnimationFrame(tick);

		transformX += inertia + MOVE_SPEED;
		inertia *= FRICTION;

		if (transformX >= width / 2) transformX = 1;
		if (transformX < 1) transformX = width / 2;

		imgs.style.transform = `translate3d(-${transformX}px, 0, 0)`;
	}

	/**
	 * When mouse or pointer is down
	 */

	function handleDragStart(e: MouseEvent | TouchEvent) {
		setWidth();
		isDragging = true;
		dragX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
	}

	/**
	 * Runs when mouse or pointer is up
	 */

	function handleDragEnd() {
		isDragging = false;
	}

	/**
	 * handles touch or mouse movement
	 */

	function handlePointerMove(e: MouseEvent | TouchEvent) {
		e.preventDefault();

		if (isDragging) {
			const pointerX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;
			inertia = dragX - pointerX;
			dragX = pointerX;
		}
	}

	/**
	 * Handles scroll
	 */

	function handleWheel(e: WheelEvent) {
		inertia = (e.deltaY + e.deltaX) / WHEEL_FRICTION;
	}

	/**
	 * Sets container width
	 */

	const setWidth = () => {
		width = imgs.getBoundingClientRect().width;
	};

	/**
	 * Initialize
	 */

	onMount(() => {
		setWidth();
		tick();

		return () => {
			cancelAnimationFrame(raf);
		};
	});
</script>

<div class="imgsWrapper">
	<div
		class="imgs"
		role="slider"
		tabindex={0}
		aria-valuenow={0}
		bind:this={imgs}
		on:mousedown={handleDragStart}
		on:mousemove={handlePointerMove}
		on:mouseup={handleDragEnd}
		on:mouseout={handleDragEnd}
		on:touchstart={handleDragStart}
		on:touchend={handleDragEnd}
		on:touchmove={handlePointerMove}
		on:wheel={handleWheel}
		on:resize={setWidth}
		on:blur={handleDragEnd}
	>
		{#each [...images, ...images] as image}
			<ResponsiveImage
				{image}
				sizes={IMAGE_COLLECTION_IMGS_SIZES}
				alt="Nick LaVecchia"
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../styles/mixins';

	.imgsWrapper {
		height: calc(100% - var(--nav-height));
		width: 100%;
		overflow: hidden;
	}

	.imgs {
		will-change: transform;

		display: flex;
		align-items: center;

		height: 100%;
		width: max-content;
		cursor: grab;

		padding-bottom: var(--nav-height);

		&:active {
			cursor: grabbing;
		}

		:global(img) {
			height: 35%;
			width: auto;
			margin-left: 5vw;

			pointer-events: none;
			user-select: none;

			@include min-width('tablet') {
				height: 50%;
				margin-left: 5vh;
			}
		}
	}
</style>
