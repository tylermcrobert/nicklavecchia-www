<script lang="ts">
	type Slug = 'root' | 'about' | 'fine-art';

	export let activeSlug: Slug;

	const routes: { display: string; href: string; slug: Slug }[] = [
		{ display: 'Portfolio', href: '/', slug: 'root' },
		{ display: 'About', href: 'about', slug: 'about' },
		{ display: 'Fine Art', href: 'products', slug: 'fine-art' }
	];
</script>

<nav class="nav">
	<div class="logo"><a href="/">Nick Lavecchia</a></div>
	<ul class="links">
		{#each routes as { slug, display, href }}
			<li>
				<a {href} class:underline={slug === activeSlug}>
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
