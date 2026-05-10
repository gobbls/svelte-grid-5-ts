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
			customDragger: false,
			customResizer: true,
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

<h2 id="custom-resizer">
	Custom Resizer<a aria-label="Permalink to 'custom-resizer'" class="header-anchor" href="#custom-resizer"></a>
</h2>

<p>
	By setting the <code>customResizer</code> property to <code>true</code>, you can specify the element to which the
	resize event will be assigned
</p>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={50}>
		{#snippet children({ item, resizePointerDown }: { item: Value; resizePointerDown: any })}
			<div class="item">
				{#if item.customResizer}
					<div class="custom-resizer" onpointerdown={resizePointerDown}>Resize this!</div>
				{/if}
			</div>
		{/snippet}
	</Grid>
</div>
