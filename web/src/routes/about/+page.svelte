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
			grabCursor: true
		});
	});
</script>

<Seo title="About" />

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

<style lang="scss">
	@import '../../styles/mixins';

	.about-wrapper {
		overflow: hidden;
	}

	.text-large {
		margin-bottom: var(--space-large);
	}

	.about-text {
		max-width: 55rem;
		margin: 0 auto;
		padding: 0 var(--space-standard);
	}

	.images {
		margin: var(--space-standard);
		margin-bottom: var(--space-x-large);
	}

	.swiper-slide {
		width: auto;

		&:not(:last-child) {
			margin-right: var(--space-standard);
		}

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
		flex: 1;
		min-width: 20rem;
	}

	.cols {
		display: flex;
		flex-wrap: wrap;
	}
</style>
