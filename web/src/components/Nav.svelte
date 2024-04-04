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

	$: isModal = MODAL_ROUTES.includes($page.route.id || '');
	$: scrimRefresh = isModal.toString();
	$: isLateral = getNavigatingType($navigating).lateral;
	$: isSecondaryEmpty = !$navStore.links && !$navStore.title;

	const ROUTES = [
		{ display: 'Portfolio', href: '/' },
		{ display: 'About', href: '/about' },
		{ display: 'Fine Art', href: '/fine-art' }
	];

	/**
	 * Fade element out.
	 * NOTE: Applies to multiple elements
	 */

	function animateOut(node: HTMLElement) {
		const tl = gsap.timeline();

		const fadeOut = {
			opacity: 0,
			duration: duration.short,
			ease: Power3.easeOut
		};

		const removeNode = { display: 'none' };

		tl.to(node, fadeOut);
		tl.set(node, removeNode);

		return { duration: tl.totalDuration() * 1000 };
	}

	/**
	 * Fade element in.
	 * NOTE: Applies to multiple elements
	 */

	function animateIn(node: HTMLElement) {
		const tl = gsap.timeline();

		const hideNode = { display: 'none', opacity: 0 };
		const fadeIn = {
			delay: isLateral ? duration.medium : duration.xLong,
			duration: duration.short,
			display: 'flex',
			opacity: 1,
			ease: Power3.easeIn
		};

		tl.set(node, hideNode);
		tl.to(node, fadeIn);

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
		<a href={isModal ? prevRoute : '/'}>Nick LaVecchia</a>
	</div>

	<!-- Secondary area  -->

	<div class="secondary" class:hidden={isSecondaryEmpty}>
		{#key scrimRefresh}
			<div class="scrim" in:animateIn out:animateOut />
		{/key}

		{#key refresh}
			<div class="secondaryInner" in:animateIn out:animateOut>
				{#if $navStore.links}
					<ul class="links">
						{#each $navStore.links as { href, name }}
							<li>
								<a {href} class:underline={href === $page.url.pathname}>
									{name}
								</a>
							</li>
						{/each}
					</ul>
				{/if}

				{#if $navStore.title}
					<h1>{$navStore.title}</h1>
				{/if}
			</div>
		{/key}
	</div>

	<!-- Right side  -->
	{#if !isModal}
		<ul class="links" in:animateIn out:animateOut>
			{#each ROUTES as { display, href }}
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

	{#key scrimRefresh}
		<div class="scrim" in:animateIn out:animateOut />
	{/key}
</nav>

<style lang="scss">
	@import '../styles/mixins';

	.scrim {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: white;
		z-index: -1;
		pointer-events: none;
	}

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

		&.hidden {
			opacity: 0;
		}

		@include max-width('tablet') {
			position: fixed;
			bottom: 0;
			left: 0;

			width: 100%;
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
