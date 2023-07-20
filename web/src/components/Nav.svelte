<script lang="ts">
	import { gsap, Power3 } from 'gsap';
	import { navigating, page } from '$app/stores';
	import { navStore } from '$lib/stores';
	import { MODAL_ROUTES, duration } from '../constants';
	import { getNavigatingType } from '$lib/util/getNavigatingType';
	import { afterNavigate } from '$app/navigation';

	/** Navigation top-level routes */
	const ROUTES = [
		{ display: 'Portfolio', href: '/' },
		{ display: 'About', href: '/about' },
		{ display: 'Fine Art', href: '/fine-art' }
	];

	/** When to refresh navigation animations */
	export let refresh: string;

	// Use standard or modal nav layout
	$: isModal = MODAL_ROUTES.includes($page.route.id || '');

	/** Change delay based on navigation type */
	$: ({ lateral } = getNavigatingType($navigating));

	/** This is for back button*/
	let prevRoute: string | null = '/';

	/** Update prevRoute on navigate */
	afterNavigate((nav) => (prevRoute = nav.from?.url.pathname || '/'));

	/**
	 * Fade element out.
	 * Applies to multiple elements
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
	 * Applies to multiple elements
	 */

	function animateIn(node: HTMLElement) {
		const tl = gsap.timeline();

		const hideNode = { display: 'none', opacity: 0 };
		const fadeIn = {
			delay: lateral ? duration.medium : duration.long,
			duration: duration.short,
			display: 'flex',
			opacity: 1,
			ease: Power3.easeIn
		};

		tl.set(node, hideNode);
		tl.to(node, fadeIn);

		return { duration: tl.totalDuration() * 1000 };
	}
</script>

<nav class="nav">
	<!-- Logo -->
	<div class="logo">
		<a href={isModal ? prevRoute : '/'}>Nick LaVecchia</a>
	</div>

	<!-- Secondary area  -->
	{#key refresh}
		<div class="secondary" in:animateIn out:animateOut>
			<!-- Secondary Links -->
			{#if $navStore.links}
				<ul class="links">
					{#each $navStore.links as { href, name }}
						<li>
							<a {href} class:underline={href === $page.url.pathname}>{name}</a>
						</li>
					{/each}
				</ul>
			{/if}

			<!-- Page Title -->
			{#if $navStore.title}
				<div class="title">{$navStore.title}</div>
			{/if}
		</div>
	{/key}

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
		<a in:animateIn out:animateOut href={prevRoute}>✕ Close</a>
	{/if}
</nav>

<style>
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
		width: 13em;
	}

	.secondary {
		flex: 1;
	}

	.links {
		display: flex;
		gap: var(--space-standard);

		/* Fix bugs with underlines flashing */
		position: relative;
		transform: translate3d(0, 0, 0);
	}
</style>
