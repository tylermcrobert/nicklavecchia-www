<script lang="ts">
	import { ResponsiveImage } from '$components';
	import { isTouchEvent } from '$lib/util/isTouchEvent';
	import { onMount } from 'svelte';
	import type { SanityImage } from './ResponsiveImage/utils/types';

	export let images: SanityImage[];

	const FRICTION = 0.95;
	const WHEEL_FRICTION = 4;
	const MOVE_SPEED = 0.1;

	let imgs: HTMLElement;
	let raf: number;

	let isDragging = false;
	let width = 0;

	let transformX = 0;
	let dragX = 0;
	let velocity = 0;

	/**
	 * Runs on rAF
	 */

	function updateImagePosition() {
		raf = requestAnimationFrame(updateImagePosition);

		// Handle velocity
		if (!isDragging) {
			transformX += velocity;
			velocity *= FRICTION;
		}

		// Constantly move carousel
		transformX -= MOVE_SPEED;

		// Handle permanant loop
		if (width / 2 < -transformX) transformX = 0;
		if (transformX > 0) transformX = width / -2;

		imgs.style.transform = `translate3d(${transformX}px, 0, 0)`;
	}

	/**
	 * When mouse or pointer is down
	 */

	function handleDragStart(e: MouseEvent | TouchEvent) {
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
		const isPinch = isTouchEvent(e) && e.touches.length >= 2;
		if (isPinch) return;

		e.preventDefault();

		if (isDragging) {
			const prevDragX = dragX;
			dragX = isTouchEvent(e) ? e.touches[0].clientX : e.clientX;

			velocity = dragX - prevDragX;
			transformX += velocity;
		}
	}

	/**
	 * Handles scroll
	 */

	function handleWheel(e: WheelEvent) {
		transformX -= (e.deltaY + e.deltaX) / WHEEL_FRICTION;
	}

	/**
	 * Sets container width
	 */

	function setWidth() {
		width = imgs?.getBoundingClientRect().width;
	}

	/**
	 * Initialize
	 */

	onMount(() => {
		setWidth();
		new ResizeObserver(setWidth).observe(imgs);

		updateImagePosition();

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
		on:blur={handleDragEnd}
	>
		{#each [...images, ...images] as image}
			<ResponsiveImage {image} sizes="70vh" alt="Nick LaVecchia" />
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../styles/mixins';

	.imgsWrapper {
		height: calc(100% - var(--nav-height));
		padding-top: var(--nav-height);

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
			height: 60vw;
			width: auto;
			margin-left: 5vw;

			pointer-events: none;
			user-select: none;

			@include min-width('tablet') {
				height: 70%;
				margin-left: 5vh;
			}
		}
	}
</style>
