<script lang="ts">
import { onMount } from 'svelte';
import Grid from '../../lib/index.svelte';
import type { Item, Size } from '../../lib/types/item';

const COL = 10;
const cols = [[1200, COL]];

let items: Item[] = $state([]);

let layoutOriginal: Item[] = [
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
];

let layout: Item[] = layoutOriginal;

const onChange = (): void => localStorage.setItem('layout', JSON.stringify(items));

function reset(): void {
	items = layoutOriginal;
	localStorage.setItem('layout', JSON.stringify(layoutOriginal));
}

onMount((): void => {
	if (!localStorage.getItem('layout')) {
		localStorage.setItem('layout', JSON.stringify(layoutOriginal));
	} else {
		layout = JSON.parse(localStorage.getItem('layout')!);
	}

	items = layout;
});
</script>

<h2 id="serialize-restore">Serialize / Restore</h2>

<p>
	This simple demo stores a copy of the items in a browser's <code>localStorage</code>. Try moving and resizing the
	items, then reloading. Watch the positions and sizes be restored.
</p>

<blockquote>Try clearing your <code>localStorage</code> if you have problems with this example.</blockquote>

<button onclick={reset}>Reset</button>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={50} onChange={onChange}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>
