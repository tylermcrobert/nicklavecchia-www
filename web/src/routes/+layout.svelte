<script lang="ts">
	import { PageTransition, Nav, SmoothScroll } from '$components';
	import '../styles/globals.scss';

	export let data;
</script>

<Nav refresh={data.navRefresh} />

<PageTransition refresh={data.pathname}>
	<SmoothScroll>
		<slot />
	</SmoothScroll>
</PageTransition>
