<script lang="ts">
	import Grid from '../../lib/index.svelte';
	import type { Item, Size } from '../../lib/types/item';

	const COL = 10;
	const cols = [[1200, COL]];

	let items: Item[] = $state([
		{
			id: 'one',
			data: '',
			[COL]: {
				fixed: false,
				resizable: true,
				draggable: true,
				customDragger: false,
				customResizer: false,
				min: { w: 1, h: 1 },
				max: {} as Size,
				x: 0,
				y: 0,
				w: 1,
				h: 3
			}
		},
		{
			id: 'two',
			data: '',
			[COL]: {
				fixed: false,
				resizable: true,
				draggable: true,
				customDragger: false,
				customResizer: false,
				min: { w: 1, h: 1 },
				max: {} as Size,
				x: 1,
				y: 0,
				w: 1,
				h: 3
			}
		},
		{
			id: 'three',
			data: '',
			[COL]: {
				fixed: false,
				resizable: true,
				draggable: true,
				customDragger: false,
				customResizer: false,
				min: { w: 1, h: 1 },
				max: {} as Size,
				x: 2,
				y: 0,
				w: 1,
				h: 3
			}
		}
	]);
</script>

<svelte:head>
	<title>Examples</title>
</svelte:head>

<Grid bind:items {cols} gap={[5, 5]} rowHeight={50} fillSpace={false}>
	{#snippet children({ movePointerDown, resizePointerDown, dataItem })}
		<div class="content"></div>
	{/snippet}
</Grid>

<style>
	.content {
		width: 100%;
		height: 100%;
		border-radius: 6px;
		background-color: red;
	}

	:global(.svlt-grid-resizer::after) {
		border-color: white !important;
	}

	:global(.svlt-grid-shadow) {
		border-radius: 6px;
		background-color: black !important;
	}

	:global(.svlt-grid-item) {
		border-radius: 6px;
	}
</style>
