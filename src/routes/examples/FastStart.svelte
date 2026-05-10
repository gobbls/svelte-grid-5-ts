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
			max: {} as Size,
			x: 3,
			y: 0,
			w: 3,
			h: 3
		}
	}
]);
</script>

<h2 id="fast-start">Fast Start</h2>

<p>
	Set <code>fastStart</code> property to <code>true</code> to disable animation on startup.
</p>

<p>
	Refresh your browser to see this in effect. Where other examples shuffles their items into their positions,<code
		>fastStart</code
	> disables this animation.
</p>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={50} fastStart={true}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>
