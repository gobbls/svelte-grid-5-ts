<script lang="ts">
import Grid from 'svelte-grid-5-ts';
import type { Item, Size } from 'svelte-grid-5-ts';

const cols = [
	[750, 5],
	[700, 3],
	[600, 1]
];

let items: Item[] = $state([
	{
		id: 'one',
		data: '',
		[5]: {
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
		},
		[3]: {
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
		},
		[1]: {
			fixed: false,
			resizable: true,
			draggable: true,
			customDragger: false,
			customResizer: false,
			min: { w: 1, h: 1 },
			max: {} as Size,
			x: 0,
			y: 0,
			w: 1,
			h: 1
		}
	},
	{
		id: 'two',
		data: '',
		[5]: {
			fixed: false,
			resizable: true,
			draggable: true,
			customDragger: false,
			customResizer: false,
			min: { w: 1, h: 1 },
			max: {} as Size,
			x: 2,
			y: 0,
			w: 3,
			h: 3
		},
		[3]: {
			fixed: false,
			resizable: true,
			draggable: true,
			customDragger: false,
			customResizer: false,
			min: { w: 1, h: 1 },
			max: {} as Size,
			x: 2,
			y: 0,
			w: 1,
			h: 3
		},
		[1]: {
			fixed: false,
			resizable: true,
			draggable: true,
			customDragger: false,
			customResizer: false,
			min: { w: 1, h: 1 },
			max: {} as Size,
			x: 0,
			y: 1,
			w: 1,
			h: 1
		}
	},
	{
		id: 'three',
		data: '',
		[5]: {
			fixed: false,
			resizable: true,
			draggable: true,
			customDragger: false,
			customResizer: false,
			min: { w: 1, h: 1 },
			max: {} as Size,
			x: 0,
			y: 3,
			w: 5,
			h: 3
		},
		[3]: {
			fixed: false,
			resizable: true,
			draggable: true,
			customDragger: false,
			customResizer: false,
			min: { w: 1, h: 1 },
			max: {} as Size,
			x: 0,
			y: 3,
			w: 3,
			h: 3
		},
		[1]: {
			fixed: false,
			resizable: true,
			draggable: true,
			customDragger: false,
			customResizer: false,
			min: { w: 1, h: 1 },
			max: {} as Size,
			x: 0,
			y: 2,
			w: 1,
			h: 1
		}
	}
]);
</script>

<h2 id="responsive">
	Responsive<a aria-label="Permalink to 'responsive'" class="header-anchor" href="#responsive"></a>
</h2>

<p>
	<em
		>Shout-out to <a href="https://github.com/yoh-extradat">yoh-extradat on Github</a>
		for <a href="https://github.com/valqelyan/svelte-grid/issues/140#issuecomment-1320392413">explaining</a> this one. The
		original docs were a bit ambiguous to me.</em
	>
</p>

<p>Change the size of your window and watch the layout change once you get past a specified breakpoint.</p>

<blockquote>
	The width you provide is not the width of the screen, but the width of the container that the <code
		>&lt;Grid /&gt;</code
	> is wrapped in.
</blockquote>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={50}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>
