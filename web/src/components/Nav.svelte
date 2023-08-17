<script lang="ts">
	import { gsap, Power3 } from 'gsap';
	import { navigating, page } from '$app/stores';
	import { navStore } from '$lib/stores';
	import { MODAL_ROUTES, NAV_ROUTES, duration } from '../constants';
	import { getNavigatingType } from '$lib/util/getNavigatingType';
	import { afterNavigate } from '$app/navigation';
	import { Close } from './icons';

	/** When to refresh navigation animations */
	export let refresh: string;
	let prevRoute: string | null = '/';

	$: derrivedState = {
		isModal: MODAL_ROUTES.includes($page.route.id || ''),
		isLateral: getNavigatingType($navigating).lateral
	};

	/**
	 * Fade element out.
	 * Applies to multiple elements
	 */

	function animateOut(
		node: HTMLElement,
		options: { ignore: boolean } = { ignore: false }
	) {
		const tl = gsap.timeline();

		const fadeOut = {
			opacity: 0,
			duration: duration.short,
			ease: Power3.easeOut
		};

		const removeNode = { display: 'none' };

		if (!options.ignore) {
			tl.to(node, fadeOut);
			tl.set(node, removeNode);
		}

		return { duration: tl.totalDuration() * 1000 };
	}

	/**
	 * Fade element in.
	 * Applies to multiple elements
	 */

	function animateIn(
		node: HTMLElement,
		options: { ignore: boolean } = { ignore: false }
	) {
		const tl = gsap.timeline();

		const hideNode = { display: 'none', opacity: 0 };
		const fadeIn = {
			delay: derrivedState.isLateral ? duration.medium : duration.long,
			duration: duration.short,
			display: 'flex',
			opacity: 1,
			ease: Power3.easeIn
		};

		if (!options.ignore) {
			tl.set(node, hideNode);
			tl.to(node, fadeIn);
		}

		return { duration: tl.totalDuration() * 1000 };
	}

	/**
	 * Update prevRoute on navigate
	 */

	afterNavigate((nav) => (prevRoute = nav.from?.url.pathname || '/'));
</script>

<nav class="nav">
	<!-- Logo -->
	<div class="logo">
		<a href={derrivedState.isModal ? prevRoute : '/'}>Nick LaVecchia</a>
	</div>

	<!-- Secondary area  -->
	{#key refresh}
		<div
			class="secondary"
			in:animateIn={{ ignore: derrivedState.isLateral }}
			out:animateOut={{ ignore: derrivedState.isLateral }}
		>
			<!-- Secondary Links -->
			{#if $navStore.links}
				<ul class="links" in:animateIn out:animateOut>
					{#each $navStore.links as { href, name }}
						<li>
							<a {href} class:underline={href === $page.url.pathname}>{name}</a>
						</li>
					{/each}
				</ul>
			{/if}

			<!-- Page Title -->
			{#if $navStore.title}
				<h1 in:animateIn out:animateOut>{$navStore.title}</h1>
			{/if}
		</div>
	{/key}

	<!-- Right side  -->
	{#if !derrivedState.isModal}
		<ul class="links" in:animateIn out:animateOut>
			{#each NAV_ROUTES as { display, href }}
				<li>
					<a {href} class:underline={href === $page.route.id}>
						{display}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<!-- Close button (For modal) -->
		<a in:animateIn out:animateOut class="iconText close" href={prevRoute}>
			<Close /> Close
		</a>
	{/if}
</nav>

<style lang="scss">
	@import '../styles/mixins';

	.nav {
		position: fixed;
		top: 0;
		z-index: var(--z-nav);

		width: 100%;
		height: var(--nav-height);
		padding: 0 var(--space-standard);

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		font-weight: bold;

		@include min-width('tablet') {
			width: 13em;
		}
	}

	.secondary {
		flex: 1;

		@include max-width('tablet') {
			position: fixed;
			bottom: 0;
			left: 0;

			width: 100%;
			background: white;
			height: var(--nav-height);

			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.links {
		display: flex;
		gap: var(--space-standard);

		/* Fix bugs with underlines flashing */
		position: relative;
		transform: translate3d(0, 0, 0);
	}

	.close {
		:global(svg) {
			position: relative;
			top: -0.5px;
		}
		:global(path) {
			stroke-width: 1.25px;
		}
	}
</style>
