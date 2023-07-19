<script lang="ts">
	import { ResponsiveImage } from '$components';
	import type { CollectionQuery } from '$lib/sanity/queries';
	import { isTouchEvent } from '$lib/util/isTouchEvent';
	import { onMount } from 'svelte';

	export let data: CollectionQuery;

	const FRICTION = 0.96;
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
		inertia = e.deltaY + e.deltaX;
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
		{#each [...data.images, ...data.images] as image}
			<ResponsiveImage {image} sizes="50vh" alt="Nick LaVecchia" />
		{/each}
	</div>
</div>

<style lang="scss">
	.imgsWrapper {
		height: 100%;
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

		&:active {
			cursor: grabbing;
		}

		:global(img) {
			height: 50%;
			margin-right: 5vh;

			pointer-events: none;
			user-select: none;
		}
	}
</style>
