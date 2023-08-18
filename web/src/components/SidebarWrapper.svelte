<script lang="ts">
	import { page } from '$app/stores';
	import { navStore } from '$lib/stores';
</script>

<div class="sidebarWrap">
	<div class="sidebarItem">
		<ul>
			{#each $navStore.links || [] as { href, name }}
				<li>
					<a {href} class:underline={href === $page.url.pathname}>{name}</a>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<slot />
	</div>
</div>

<style lang="scss">
	@import '../styles/mixins';

	.sidebarItem {
		display: none;
	}

	@include min-width('desktop-lg') {
		.sidebarWrap {
			display: grid;
			grid-template-columns: 25rem 1fr;
		}

		.sidebarItem {
			display: block;

			position: sticky;
			top: var(--nav-height);
			align-self: flex-start;

			padding: var(--space-standard);
			line-height: 1.5;
		}
	}
</style>
