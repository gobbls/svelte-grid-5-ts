<script lang="ts">
import Grid from 'svelte-grid-5-ts';
import { gridHelp } from 'svelte-grid-5-ts';
import type { Item } from 'svelte-grid-5-ts';

const cols: number[][] = [[1200, 6]];

const items: Item[] = [
	{
		id: '[SOME UNIQUE ID]',
		data: '[YOUR DATA GOES HERE]',
		6: gridHelp.item({
			x: 0,
			y: 0,
			w: 2,
			h: 2,
			draggable: false,
			max: { w: 2, h: 1 }
		})
	}
];
</script>

<Grid items={items} gap={[10, 5]} cols={cols} rowHeight={150}>
	{#snippet children({ dataItem }: { dataItem: Item })}
		<div>{dataItem.data}</div>
	{/snippet}
</Grid>
