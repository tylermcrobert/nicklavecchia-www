<script lang="ts" context="module">
	type LenisContext = { resize: () => void };

	export function getLenisContext(): LenisContext {
		return getContext('lenisCtx');
	}
</script>

<script lang="ts">
	import { getContext, onMount, setContext, tick } from 'svelte';
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

	setContext<LenisContext>('lenisCtx', {
		resize: async () => {
			await tick();
			lenis.resize();
		}
	});
</script>

<div bind:this={wrapper} class="scrollWrap">
	<div bind:this={content} class="content">
		<slot />
		<div class="bottomShim" />
	</div>
</div>

<style lang="scss">
	@import '../styles/mixins';

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

	@include max-width('tablet') {
		.bottomShim {
			height: var(--nav-height);
		}
	}
</style>
