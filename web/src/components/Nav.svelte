<script lang="ts">
	import { page } from '$app/stores';
	import { navStore } from '$lib/stores';

	const routes = [
		{ display: 'Portfolio', href: '/' },
		{ display: 'About', href: '/about' },
		{ display: 'Fine Art', href: '/fine-art' }
	];
</script>

<nav class="nav">
	<div class="logo"><a href="/">Nick Lavecchia</a></div>

	<div class="secondary">
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
			<div>{$navStore.title}</div>
		{/if}
	</div>

	<ul class="links">
		{#each routes as { display, href }}
			<li>
				<a {href} class:underline={href === $page.route.id}>
					{display}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.nav {
		padding: var(--space-standard);
		position: sticky;
		top: 0;
		background: white;

		display: flex;
		justify-content: space-between;
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
