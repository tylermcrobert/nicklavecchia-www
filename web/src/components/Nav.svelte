<script lang="ts">
	import { page } from '$app/stores';

	const routes = [
		{ display: 'Portfolio', href: '/' },
		{ display: 'About', href: '/about' },
		{ display: 'Fine Art', href: '/fine-art' }
	];
</script>

<nav class="nav">
	<div class="logo"><a href="/">Nick Lavecchia</a></div>
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

	.links {
		display: flex;
		gap: var(--space-standard);
	}

	.logo {
		font-weight: bold;
	}
</style>
