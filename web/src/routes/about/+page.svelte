<script lang="ts">
	import Swiper from 'swiper';
	import 'swiper/css';

	import ResponsiveImage from '$components/ResponsiveImage/ResponsiveImage.svelte';
	import Seo from '$components/Seo.svelte';
	import { setTitle } from '$lib/stores';
	import { PortableText } from '@portabletext/svelte';
	import { onMount } from 'svelte';

	export let data;
	let swiperEl: HTMLElement;

	setTitle('Bio');

	onMount(() => {
		new Swiper(swiperEl, {
			slidesPerView: 'auto',
			grabCursor: true,
			spaceBetween: 20
		});
	});
</script>

<Seo title="About" />

<div class="about-outer">
	<div class="about-wrapper">
		<div class="images" bind:this={swiperEl}>
			<div class="swiper-wrapper">
				{#each data.aboutImages as image}
					<div class="swiper-slide">
						<ResponsiveImage {image} alt="Nick LaVecchia" sizes="50vw" />
					</div>
				{/each}
			</div>
		</div>

		<div class="about-text">
			<div class="text-large">
				<PortableText value={data.info.bio} />
			</div>

			<div class="cols">
				<div class="col">
					<h2>Clients</h2>

					<ul class="text-large">
						{#each data.info.clients as client}
							<li>{client}</li>
						{/each}
					</ul>
				</div>

				<div class="col">
					<h2>Contact</h2>

					<ul class="text-large">
						{#each data.info.contactMethods as { label, value, url }}
							<a href={url} target="blank">
								<li>{label} → {value}</li>
							</a>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@import '../../styles/mixins';

	.about-outer {
		overflow-x: hidden;
	}

	.about-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-large);

		padding-top: var(--size-large);
		padding: var(--space-standard);

		max-width: 80rem;
		margin: 0 auto;
	}

	.swiper-slide {
		width: auto;

		:global(img) {
			height: 60vh;
			max-height: 50vw;
			width: auto;
		}
	}

	h2 {
		margin-bottom: var(--space-standard);
	}

	.col {
		margin-bottom: var(--space-large);
	}

	@include min-width('tablet') {
		.cols {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
