<script lang="ts">
	import { Seo } from '$components';
	import Select from '$components/Select.svelte';
	import { Plus, ArrowNE } from '$components/icons';
	import { clearNav } from '$lib/stores';
	import type ShopifyBuy from 'shopify-buy';

	export let data: { product: ShopifyBuy.Product };

	$: ({ images, descriptionHtml, title, variants } = data.product);
	$: variantTitles = variants.map((item) => item.title);
	$: subjectLine = `Purchase Inquiry – ${title} (${currentVariant})`;

	let isDescOpen = false;
	$: currentVariant = variantTitles[0];

	function toggleDesc() {
		isDescOpen = !isDescOpen;
	}

	clearNav();
</script>

<Seo {title} />

<div class="wrapper">
	<div class="info">
		<div class="text-large">
			<h1>{title}</h1>

			<Select
				options={variantTitles}
				currentOption={currentVariant}
				onSelectChange={(val) => (currentVariant = val)}
			/>

			<button
				class="expand iconText"
				on:click={toggleDesc}
				on:keydown={toggleDesc}
				aria-expanded={isDescOpen}
			>
				<Plus /> Description
			</button>
			<div>
				<a
					href={`mailto:nick@nicklavecchia.com?subject=${subjectLine}`}
					target="_blank"
					rel="noreferrer"
					class="underline iconText"
				>
					Contact for Print <ArrowNE />
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
	}

	.desc {
		padding-top: var(--space-large);
	}

	img {
		margin-bottom: var(--space-standard);
	}
</style>
