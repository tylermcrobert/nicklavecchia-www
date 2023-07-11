<script lang="ts">
	import { page } from '$app/stores';
	import { navStore } from '$lib/stores';
	import { gsap, Power3 } from 'gsap';
	import { fade } from 'svelte/transition';
	import { MODAL_ROUTES } from '../constants';

	const ROUTES = [
		{ display: 'Portfolio', href: '/' },
		{ display: 'About', href: '/about' },
		{ display: 'Fine Art', href: '/fine-art' }
	];

	export let refresh: string;

	$: isModal = MODAL_ROUTES.includes($page.route.id || '');

	function animateOut(node: HTMLElement) {
		const tl = gsap.timeline();

		tl.to(node, {
			opacity: 0,
			duration: 0.8,
			ease: Power3.easeOut
		});
		tl.set(node, { display: 'none' });

		return { duration: 800 };
	}

	function animateIn(node: HTMLElement) {
		const tl = gsap.timeline();

		tl.set(node, { display: 'none', opacity: 0 });
		tl.to(node, {
			delay: 0.45,
			duration: 0.8,
			// Todo: Unset property maybe?
			display: 'flex',
			opacity: 1,
			ease: Power3.easeIn
		});

		return { duration: 1200 };
	}
</script>

<nav class="nav">
	<div class="logo"><a href="/">Nick LaVecchia</a></div>

	{#key refresh}
		<div class="secondary" in:animateIn out:animateOut>
			{#if $navStore.items}
				<ul class="links" out:fade in:fade>
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

		background: white;

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
	}
</style>
