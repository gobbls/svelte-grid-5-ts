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
	}
]);
</script>

<h2 id="basic">Basic</h2>

<p>
	Drag some boxes around, resize them. This is a basic, non-responsive layout. In order to make it responsive you have
	to create breakpoints.
</p>

<blockquote>
	You will find that most of these examples use the breakpoint <code>[[1200, 10]]</code>.<br />
	<code>1200</code> &mdash; when there is a single breakpoint &mdash; can be pretty much be any number since there are
	no other breakpoints to listen for when resizing the container. But to be explicit, I have used <code>1200</code>,
	since it's a decent baseline if you want to add more breakpoints for responsiveness.
</blockquote>

<div class="demo">
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={50}>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>
