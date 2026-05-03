<script lang="ts">
import Grid from '../../lib/index.svelte';
import type { Item, Size } from '../../lib/types/item';

const COL = 10;
const cols = [[1200, COL]];

let items: Item[] = $state([
	{
		id: 'one',
		data: 'box',
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
			w: 3,
			h: 3
		}
	},
	{
		id: 'two',
		data: 'box',
		[COL]: {
			fixed: false,
			resizable: true,
			draggable: true,
			customDragger: false,
			customResizer: false,
			min: { w: 1, h: 1 },
			max: {} as Size,
			x: 3,
			y: 0,
			w: 2,
			h: 3
		}
	},
	{
		id: 'three',
		data: 'fixed box',
		[COL]: {
			fixed: true,
			resizable: false,
			draggable: false,
			customDragger: false,
			customResizer: false,
			min: { w: 1, h: 1 },
			max: {} as Size,
			x: 5,
			y: 0,
			w: 2,
			h: 3
		}
	}
]);
</script>

<h1 id="fixed">Fixed</h1>

<p>Fixed elements cannot be moved or resized. Other elements move themselves around a fixed element.</p>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={50}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="item">
				{dataItem.data}
			</div>
		{/snippet}
	</Grid>
</div>
