<script lang="ts">
	import { onMount } from 'svelte';
	import { Nav } from '../components';
	import '../styles/globals.scss';
	import Lenis from '@studio-freight/lenis';

	onMount(() => {
		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});
</script>

<Nav activeSlug="root" />
<slot />
