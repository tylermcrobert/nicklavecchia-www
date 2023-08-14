<script lang="ts">
	import ResponsiveImage from '$components/ResponsiveImage/ResponsiveImage.svelte';
	import Seo from '$components/Seo.svelte';
	import { setTitle } from '$lib/stores';
	import { PortableText } from '@portabletext/svelte';

	export let data;
	setTitle('Bio');
</script>

<Seo title="About" />

<div class="about-wrapper">
	<div class="images">
		{#each data.aboutImages as image}
			<ResponsiveImage {image} alt="Nick LaVecchia" sizes="50vw" />
		{/each}
	</div>

	<div class="text">
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
		display: flex;
		flex-direction: column;
		gap: var(--space-large);

		padding-top: var(--size-large);
		padding: var(--space-standard);
	}

	.images {
		display: flex;
		gap: var(--space-standard);

		width: 100%;
		overflow-x: scroll;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	h2 {
		margin-bottom: var(--space-standard);
	}

	.col {
		margin-bottom: var(--space-large);
	}

	@include max-width('tablet') {
		.images {
			margin: 0 calc(var(--space-standard) * -1);
			width: calc(100% + (var(--space-standard) * 2));
			padding: 0 var(--space-standard);

			:global(img) {
				height: 50vw;
				width: auto;
			}
		}
	}

	@include min-width('tablet') {
		.cols {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}

	@include min-width('laptop') {
		.images {
			flex-direction: column;
		}

		.about-wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
