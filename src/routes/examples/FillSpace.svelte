<script lang="ts">
import Grid from '../../lib/index.svelte';
import type { Item, Position } from '../../lib/types/item';
import { gridHelp } from '$lib';
import { onMount } from 'svelte';
import { id, randomNumberInRange } from './util';

const COL = 10;
const cols = [[1200, COL]];

let items: Item[] = $state([]);
let fillSpace: boolean = $state(true);

function add() {
	let newItem: Item = {
		[COL]: gridHelp.item({
			w: Math.round(randomNumberInRange(1, 4)),
			h: Math.round(randomNumberInRange(1, 4)),
			x: 0,
			y: 0
		}),
		id: id(),
		data: ''
	};

	let findOutPosition: Position = gridHelp.findSpace(newItem, items, COL);

	newItem = {
		...newItem,
		[COL]: {
			...newItem[COL],
			...findOutPosition
		}
	};

	items = [...items, ...[newItem]];
}

onMount(() => {
	for (let i = 10; i > 0; i--) add();
});
</script>

<h1 id="fill-space">Fill Space</h1>

<p>
	<code>fillSpace</code> means that each grid element (except the active element) must find its own position.
</p>

<label>
	<input type="checkbox" bind:checked={fillSpace} />
	<code>fillSpace</code> is {fillSpace ? 'enabled' : 'disabled'}.
</label>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={50} fillSpace={fillSpace}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>
