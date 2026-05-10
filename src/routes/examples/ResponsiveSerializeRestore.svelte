<script lang="ts">
import { onMount } from 'svelte';
import Grid from '../../lib/index.svelte';
import type { Item, Size, Value } from '../../lib/types/item';
import type { OnMount, OnResize } from '$lib';

const cols = [
	[750, 5],
	[700, 3],
	[600, 1]
];

let layoutOriginal: Item[] = $state([
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
			x: 3,
			y: 1,
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
	}
]);

let items: Item[] = $state([]);
let columns: number = $state(5);

const handleSync = () => localStorage.setItem('layout-responsive', JSON.stringify(items));
const setCols = (e: OnResize | OnMount) => (columns = e.cols);

function reset() {
	items = items.map((value: Item, index: number) => {
		const restore: Value = layoutOriginal[index][columns];
		return {
			...value,
			[columns]: restore
		};
	});

	localStorage.setItem('layout-responsive', JSON.stringify(items));
}

onMount(() => {
	if (!localStorage.getItem('layout-responsive'))
		localStorage.setItem('layout-responsive', JSON.stringify(layoutOriginal));
	else items = JSON.parse(localStorage.getItem('layout-responsive')!);
});
</script>

<h2 id="responsive-serialize-restore">
	Responsive - Serialize / Restore<a
		aria-label="Permalink to 'responsive-serialize-restore'"
		class="header-anchor"
		href="#responsive-serialize-restore"
	></a>
</h2>

<blockquote>
	This functionality was previously broken by me, due to a misunderstandings when translating the functionality to
	TypeScript. <em>This now works as intended</em>.
</blockquote>

<p>
	This demonstrates that <code>localStorage</code> updates when changes to breakpoint spec occurs &mdash; size, position,
	draggable, etc &mdash; while maintaining the breakpoint specs that were not modified.
</p>

<p>Resize your window to see the layout change once a breakpoint's threshold is crossed.</p>

<blockquote>Try clearing your <code>localStorage</code> if you have problems with this example.</blockquote>

<button onclick={reset}>reset</button>

<div class="demo">
	<Grid
		bind:items={items}
		cols={cols}
		gap={[5, 5]}
		rowHeight={50}
		onMount={setCols}
		onResize={setCols}
		onPointerUp={handleSync}
	>
		{#snippet children({ index }: { index: number })}
			<div class="item">{index}</div>
		{/snippet}
	</Grid>
</div>
