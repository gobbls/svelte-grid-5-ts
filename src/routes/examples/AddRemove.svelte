<script lang="ts">
import Grid from '../../lib/index.svelte';
import type { Item, Position, Size } from '../../lib/types/item';
import { gridHelp } from '$lib';
import { id, randomNumberInRange } from './util';

const COL = 10;
const COLS = [[1200, COL]];

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

let adjustAfterRemove: boolean = $state(false);

function add(): void {
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

function addToStart(): void {
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
	items = [...[newItem], ...items];
	items = gridHelp.adjust(items, COL);
}

function remove(item: Item): void {
	items = items.filter((value) => value.id !== item.id);
	if (adjustAfterRemove) items = gridHelp.adjust(items, COL);
}
</script>

<h2 id="add-remove">Add / Remove</h2>

<p>
	This demo shows what happens when items are dynamically added and removed. You can remove an item by clicking its “x”
	button, and add new ones with one of the two buttons below. After adding an element, you can use the <code
		>normalize</code
	>
	or <code>adjust</code> functions. These will be used to prevent a situation where your item will overlap another.
</p>

<button onclick={addToStart}>Add random size to start</button>

<button onclick={add}>Add random size</button>

<label>
	<input bind:checked={adjustAfterRemove} type="checkbox" /> Adjust elements after removing an item.
</label>

<div class="demo">
	<Grid bind:items={items} cols={COLS} gap={[5, 5]} rowHeight={50}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="item">
				{dataItem.id}
				<button class="x-button" onpointerdown={(e) => e.stopPropagation()} onclick={() => remove(dataItem)}> x</button>
			</div>
		{/snippet}
	</Grid>
</div>
