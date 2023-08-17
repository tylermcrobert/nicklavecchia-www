<script lang="ts">
	import ChevronDown from './icons/ChevronDown.svelte';

	export let currentOption: string;
	export let options: string[];
	export let onSelectChange: (val: string) => void;
</script>

<div class="selectWrap">
	<div class="iconText">
		{currentOption}
		<ChevronDown />
	</div>

	<select
		value={currentOption}
		on:change={(e) => onSelectChange(e.currentTarget.value)}
	>
		{#each options as option}
			<option value={option}>
				{option}
			</option>
		{/each}
	</select>
</div>

<style lang="scss">
	.selectWrap {
		position: relative;

		select {
			position: absolute;
			top: 0;
			width: 100%;
			opacity: 0;
		}
	}
</style>
