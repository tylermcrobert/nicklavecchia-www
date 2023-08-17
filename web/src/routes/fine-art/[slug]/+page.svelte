<script lang="ts">
	import { Seo } from '$components';
	import { clearNav } from '$lib/stores';
	import type ShopifyBuy from 'shopify-buy';

	export let data: { product: ShopifyBuy.Product };

	let isDescOpen = false;

	function toggleDesc() {
		isDescOpen = !isDescOpen;
	}

	clearNav();

	$: ({ images, descriptionHtml, title } = data.product);
	$: subjectLine = `Purchase Inquiry – ${title}`;
</script>

<Seo {title} />

<div class="wrapper">
	<div class="info">
		<div class="text-large">
			<h1>{title}</h1>
			<button
				class="expand"
				on:click={toggleDesc}
				on:keydown={toggleDesc}
				aria-expanded={isDescOpen}
			>
				{isDescOpen ? '－' : '＋'} Description
			</button>
			<div>
				<a
					href={`mailto:nick@nicklavecchia.com?subject=${subjectLine}`}
					target="_blank"
					rel="noreferrer"
					class="underline"
				>
					Contact for Print &nearr;
				</a>
			</div>
		</div>

		{#if isDescOpen}
			<!-- eslint-disable svelte/no-at-html-tags -->
			<div class="text-para desc">{@html descriptionHtml}</div>
		{/if}
	</div>

	<div class="images">
		{#each images as image}
			<img src={image.src} alt="Nick LaVecchia" />
		{/each}
	</div>
</div>

<style lang="scss">
	@import '../../../styles/mixins';

	.wrapper {
		padding: var(--space-standard);
		padding-top: 0;

		@include min-width('tablet') {
			display: flex;
			flex-direction: row-reverse;
			gap: 10%;

			padding: 0 10%;
			padding-top: 0;
		}
	}

	.info,
	.images {
		flex: 1;
		padding-top: var(--space-large);
	}

	.info {
		width: 100%;
		max-width: 25em;

		@include min-width('tablet') {
			align-self: flex-start;

			overflow-y: scroll;
			position: sticky;
			top: var(--nav-height);
		}
	}

	.desc {
		padding-top: var(--space-large);
	}

	img {
		margin-bottom: var(--space-standard);
	}
</style>
