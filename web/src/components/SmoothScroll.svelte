<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from '@studio-freight/lenis';

	let lenis: Lenis;
	let wrapper: HTMLElement;
	let content: HTMLElement;

	onMount(() => {
		lenis = new Lenis({ wrapper, content });

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});
</script>

<div bind:this={wrapper} class="scrollWrap">
	<div bind:this={content} class="content">
		<slot />
	</div>
</div>

<style lang="scss">
	.scrollWrap {
		overflow-y: scroll;
		height: 100%;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.content {
		height: 100%;
		padding-top: var(--nav-height);
	}
</style>
