<script lang="ts">
	import { PageTransition, Nav, SmoothScroll, WindowHeight } from '$components';

	import '../styles/globals.scss';

	export let data;
</script>

<Nav refresh={data.navRefresh} />

<WindowHeight />

<PageTransition refresh={data.pathname}>
	<SmoothScroll>
		<slot />
	</SmoothScroll>
</PageTransition>
