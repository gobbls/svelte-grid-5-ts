<script lang="ts">
import Grid from '../../lib/index.svelte';
import type { Item, Size, Value } from '../../lib/types/item';

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
			customDragger: true,
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

<h2 id="custom-dragger">
	Custom Dragger<a aria-label="Permalink to 'custom-dragger'" class="header-anchor" href="#custom-dragger"></a>
</h2>

<p>
	By setting the <code>customDragger</code> property to <code>true</code>, you may specify the element to which the drag
	event will be assigned.
</p>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={50}>
		{#snippet children({ item, movePointerDown }: { item: Value; movePointerDown: any })}
			<div class="item">
				{#if item.customDragger}
					<div class="custom-dragger" onpointerdown={movePointerDown}>Drag this!</div>
				{/if}
			</div>
		{/snippet}
	</Grid>
</div>
