<script lang="ts">
import Grid from 'svelte-grid-5-ts';
import type { Item, Size } from 'svelte-grid-5-ts';

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
			w: 2,
			h: 2
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
			x: 2,
			y: 0,
			w: 2,
			h: 2
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
			x: 0,
			y: 2,
			w: 2,
			h: 2
		}
	},
	{
		id: 'four',
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
			y: 2,
			w: 2,
			h: 2
		}
	}
]);

let gapY = $state(20);
let gapX = $state(20);
</script>

<h2 id="gap">
	Gap<a aria-label="Permalink to 'gap'" class="header-anchor" href="#gap"></a>
</h2>

<p>In this example we set the gap between rows and columns to 20px.</p>

<div class="row">
	<label>
		X axis &nbsp;
		<input type="number" size="5" min={0} bind:value={gapX} />
	</label>
	<label>
		Y axis &nbsp;<input type="number" size="5" min={0} bind:value={gapY} />
	</label>
</div>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[gapX, gapY]} rowHeight={50}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>
