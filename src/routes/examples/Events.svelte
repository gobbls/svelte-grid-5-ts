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
			draggable: false,
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
		data: '',
		[COL]: {
			fixed: false,
			resizable: false,
			draggable: true,
			customDragger: false,
			customResizer: false,
			min: { w: 1, h: 1 },
			max: {} as Size,
			x: 3,
			y: 0,
			w: 3,
			h: 3
		}
	}
]);
</script>

<h1 id="events">Events</h1>

<p>You may disable <code>dragging</code> and <code>resizing</code></p>

<blockquote>
	Combining these two does not achieve the same effect as <code>fixed</code>; these may be moved in response to movement
	of another item, whereas <code>fixed</code> will not.
</blockquote>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={50}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="item">
				{#if !dataItem[COL].draggable}
					No dragging
				{/if}
				{#if !dataItem[COL].resizable}
					No resizing
				{/if}
			</div>
		{/snippet}
	</Grid>
</div>
