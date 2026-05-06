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
			max: { w: 4, h: 5 } as Size,
			x: 0,
			y: 0,
			w: 3,
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
			max: { w: 6, h: 7 } as Size,
			x: 3,
			y: 0,
			w: 3,
			h: 3
		}
	}
]);
</script>

<h2 id="min-max-size">Min / Max size</h2>

<p>Control how much a user can resize an item.</p>

<blockquote>
	If a <code>min</code> value is not set, a user can make the item so small that it is practically impossible to
	restore. For that reason, it is higly recommended to add a <code>min</code> value.
	<code>&lbrace; w: 1, h: 1 &rbrace;</code> is more than enough.
</blockquote>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={50}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="item">
				min: {dataItem[COL].min!.w} / {dataItem[COL].min!.h}<br />
				max: {dataItem[COL].max!.w} / {dataItem[COL].max!.h}
			</div>
		{/snippet}
	</Grid>
</div>
