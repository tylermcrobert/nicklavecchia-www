<script lang="ts">
	import Seo from '$components/Seo.svelte';
	import { setTitle } from '$lib/stores';
	/** eslint-disable svelte/no-at-html-tags */
	import type ShopifyBuy from 'shopify-buy';

	export let data: { product: ShopifyBuy.Product };
	const { images, descriptionHtml, title } = data.product;
	const subjectLine = `Purchase Inquiry – ${title}`;

	let isDescOpen = false;

	function toggleDesc() {
		isDescOpen = !isDescOpen;
	}

	setTitle(title);
</script>

<!-- eslint-disable svelte/no-at-html-tags -->

<Seo {title} />

<div class="wrapper">
	<div class="info">
		<div class="text-large">
			<h1>{title}</h1>
			<button class="expand" on:click={toggleDesc} on:keydown={toggleDesc}>
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
		padding-top: var(--space-large);

		@include min-width('tablet') {
			display: flex;
			flex-direction: row-reverse;
			gap: 10%;

			padding: 0 10%;
			padding-top: inherit;
		}
	}

	.info,
	.images {
		flex: 1;
	}

	.info {
		width: 100%;
		max-width: 25em;
		line-height: 1.5;

		@include max-width('tablet') {
			margin-bottom: var(--space-large);
		}
	}

	.desc {
		padding-top: var(--space-large);
	}

	img {
		margin-bottom: var(--space-standard);
	}
</style>
