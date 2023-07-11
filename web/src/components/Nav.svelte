<script lang="ts">
	import { gsap, Power3 } from 'gsap';
	import { navigating, page } from '$app/stores';
	import { navStore } from '$lib/stores';
	import { DLY_FADE, DUR_FADE, DUR_MODAL, MODAL_ROUTES } from '../constants';
	import { navType } from '$lib/util/navType';

	const ROUTES = [
		{ display: 'Portfolio', href: '/' },
		{ display: 'About', href: '/about' },
		{ display: 'Fine Art', href: '/fine-art' }
	];

	export let refresh: string;

	$: isModal = MODAL_ROUTES.includes($page.route.id || '');
	$: ({ lateral } = navType($navigating));

	function animateOut(node: HTMLElement) {
		const tl = gsap.timeline();

		tl.to(node, {
			opacity: 0,
			duration: DUR_FADE,
			ease: Power3.easeOut
		});

		tl.set(node, { display: 'none' });

		return { duration: DUR_FADE * 1000 };
	}

	function animateIn(node: HTMLElement) {
		gsap.set(node, { display: 'none', opacity: 0 });
		gsap.to(node, {
			delay: lateral ? DLY_FADE + 0.1 : DUR_MODAL, // add a .1s to avoid flashes
			duration: DUR_FADE,
			display: 'flex',
			opacity: 1,
			ease: Power3.easeIn
		});

		return { duration: DLY_FADE + DUR_FADE * 1000 };
	}
</script>

<nav class="nav">
	<div class="logo"><a href="/">Nick LaVecchia</a></div>

	{#key refresh}
		<div class="secondary" in:animateIn out:animateOut>
			{#if $navStore.items}
				<ul class="links">
					{#each $navStore.items as { href, name }}
						<li>
							<a {href} class:underline={href === $page.url.pathname}>{name}</a>
						</li>
					{/each}
				</ul>
			{/if}

			{#if $navStore.title}
				<div class="title">{$navStore.title}</div>
			{/if}
		</div>
	{/key}

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
		<div in:animateIn out:animateOut>Close</div>
	{/if}
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		z-index: 200;

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
