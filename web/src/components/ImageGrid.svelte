<div class="imageGrid">
	<slot />
</div>

<style lang="scss">
	.imageGrid {
		gap: var(--space-standard);
		padding: var(--space-standard);
		padding-top: var(--space-large);

		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: var(--space-large) var(--space-standard);
	}
</style>
