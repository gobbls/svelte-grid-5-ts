<script lang="ts">
import Grid from 'svelte-grid-5-ts';
import type { Item } from 'svelte-grid-5-ts';
import { gridHelp } from 'svelte-grid-5-ts';

const id = (): string => '_' + Math.random().toString(36).substring(2, 9);

const breakpoint: number = 1200;
const column: number = 6;
const cols: number[][] = [[breakpoint, column]];

let items: Item[] = [
	{
		id: id(),
		data: '',
		[column]: gridHelp.item({
			x: 0,
			y: 0,
			w: 2,
			h: 2
		})
	},
	{
		id: id(),
		data: '',
		[column]: gridHelp.item({
			x: 2,
			y: 0,
			w: 2,
			h: 2
		})
	}
];
</script>

<Grid bind:items={items} cols={cols} rowHeight={50}>
	{#snippet children({ dataItem }: { dataItem: Item })}
		<div>{dataItem.id}</div>
	{/snippet}
</Grid>
