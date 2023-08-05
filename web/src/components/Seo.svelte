<script lang="ts">
	export let title: string | null;

	$: derrivedTitle = title
		? `${title.toUpperCase()} - NICK LAVECCHIA`
		: 'NICK LAVECCHIA';
</script>

<title>{derrivedTitle}</title>
<meta
	name="description"
	content="Nick LaVecchia is a commercial and fine art photographer based along the beautiful coast of Maine."
/>
