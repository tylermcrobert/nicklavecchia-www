<script lang="ts">
	import ResponsiveImage from '$components/ResponsiveImage/ResponsiveImage.svelte';
	import { setTitle } from '$lib/stores';
	import { PortableText } from '@portabletext/svelte';

	export let data;
	setTitle('Bio');
</script>

<div class="images">
	{#each data.aboutImages as image}
		<ResponsiveImage {image} alt="Nick LaVecchia" sizes="50vw" />
	{/each}
</div>

<div class="about-main">
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

<style lang="scss">
	.images {
		width: 100%;

		display: flex;
		gap: var(--space-standard);
		padding: 0 var(--space-standard);
		margin-top: var(--space-large);

		overflow-x: scroll;
		scroll-snap-type: x mandatory;
		scroll-padding: var(--space-standard);

		&::-webkit-scrollbar {
			display: none;
		}

		:global(img) {
			scroll-snap-align: start;

			height: 50vh;
			width: auto;
		}
	}

	.about-main {
		padding: var(--space-large) var(--space-standard);

		.cols {
			display: flex;

			.col {
				flex: 1;

				h2 {
					margin-bottom: var(--space-standard);
				}
			}
		}
	}

	.text-large {
		line-height: 1.5;

		:global(p) {
			margin-bottom: 1rem;
		}
	}
</style>
