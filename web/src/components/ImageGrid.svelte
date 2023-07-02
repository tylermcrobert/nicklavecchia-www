<div class="imageGrid">
	<slot />
</div>

<style lang="scss">
	.imageGrid {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-standard);
		padding: var(--space-standard);

		:global(img) {
			display: inline-block;
			vertical-align: top;

			height: 100px;
			width: auto;
		}
	}
</style>
