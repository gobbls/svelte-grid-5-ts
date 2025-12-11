<script lang="ts">
	import type { Item, Size } from '../lib/types/item';
	import Grid from '../lib/index.svelte';

	const COL = 10;
	const cols = [[200, COL]];

	let items: Item[] = $state([
		{
			id: 'move me around',
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
				w: 2,
				h: 3
			}
		},
		{
			id: 'some',
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
				h: 1
			}
		},
		{
			id: 'stuff',
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
				y: 1,
				w: 1,
				h: 2
			}
		},
		{
			id: 'around',
			data: '',
			[COL]: {
				fixed: false,
				resizable: true,
				draggable: true,
				customDragger: false,
				customResizer: false,
				min: { w: 1, h: 1 },
				max: {} as Size,
				x: 8,
				y: 2,
				w: 2,
				h: 1
			}
		}
	]);
</script>

<div class="demo">
	<Grid
		bind:items
		{cols}
		gap={[2, 2]}
		rowHeight={50}
		fillSpace={false}
		fastStart
	>
		{#snippet children({ dataItem })}
			<div class="item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>
