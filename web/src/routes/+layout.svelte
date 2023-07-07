<script lang="ts">
	import { Nav } from '$components';
	import '../styles/globals.scss';

	import { PageTransition } from '$components';

	export let data: { pathname: string };
</script>

<Nav />

<PageTransition refresh={data.pathname}>
	<slot />
</PageTransition>
