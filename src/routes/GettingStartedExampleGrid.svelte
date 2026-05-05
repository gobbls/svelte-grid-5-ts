<script lang="ts">
import Grid from '../lib/index.svelte';
import type { Item, Size } from '../lib/types/item';
import type { OnChange } from '../lib/types/funcs';

const COL = 10;
const cols = [[1200, COL]];

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
	}
]);

let updates: number = $state(0);

function handleOnChange({ ...data }: OnChange): void {
	updates++;
	console.log(`[UPDATE: ${updates}] Have a look at the data we can use:`, data);
}
</script>

<div class="sg5-wrapper">
	<Grid bind:items={items} cols={cols} gap={[2, 2]} rowHeight={50} fastStart onChange={handleOnChange}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="sg5-item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>

<style>
.sg5-wrapper {
	max-width: 760px;
	box-sizing: border-box;
	border: 1px solid white;
	background-color: #161618;
	margin-top: 30px;
}

.sg5-item {
	width: 100%;
	height: 100%;
	color: #161618;
	background-color: #a8b1ff;
	overflow: hidden;
}
</style>
