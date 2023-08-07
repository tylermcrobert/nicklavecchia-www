<script lang="ts">
	export let title: string;
	export let href: string;
</script>

<a {href}>
	<div class="card">
		<div class="image"><slot /></div>
		<h3 class="title">{title}</h3>
	</div>
</a>

<style>
	.image {
		margin-bottom: var(--space-standard);
	}
</style>
