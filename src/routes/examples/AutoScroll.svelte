<script lang="ts">
import Grid from '../../lib/index.svelte';
import type { Item, Size } from '../../lib/types/item';
import { onMount } from 'svelte';
import { HighlightSvelte } from 'svelte-highlight';

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
			h: 10
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

let container: HTMLDivElement | undefined = $state();
let documentContainer: HTMLDivElement | undefined = $state();
let useDocument: boolean = $state(false);
let scroller: HTMLDivElement | undefined = $derived(useDocument ? documentContainer : container);
let sensor: number = $state(20);

const example: string =
	`<script lang="ts">
  let container: HTMLElement | undefined;
</scr` +
	'ipt>' +
	`\n\n<!-- You can use a custom container as a scroll target. -->
<div bind:this={container}>
  <Grid
    /* ... */
    scroller={container}
    >
      /* ... */
  </Grid>
</div>`;

onMount(() => {
	documentContainer = document.getElementsByTagName('main')[0] as HTMLDivElement;
});
</script>

<h2 id="autoscroll">
	Autoscroll<a aria-label="Permalink to 'autoscroll'" class="header-anchor" href="#autoscroll"></a>
</h2>

<p>Simple auto-scrolling that only requires a reference to your container.</p>

<p>
	Autoscrolling occurs when the cursor is close to the bottom edge of your container when dragging or resizing an
	element.
</p>

<p>
	<em
		>This does not happen when the bottom or top of an item is close to the edge. It's the <strong>cursor's</strong> position
		that is used for this feature.</em
	>
</p>

<label>
	<input type="checkbox" bind:checked={useDocument} />
	Use document
</label>

<HighlightSvelte code={example} />

<label>
	Sensor value
	<input type="number" size="5" bind:value={sensor} />
</label>

<p>Set the distance from the cursor to the edge at which the autoscroller kicks in (the default value is 20).</p>

<div class="demo" class:container={!useDocument} bind:this={container}>
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={100} scroller={scroller} sensor={sensor}>
		{#snippet children()}
			<div class="item"></div>
		{/snippet}
	</Grid>
</div>

<style>
.demo {
	margin-left: 0;
}

.container {
	max-width: 300px;
	width: 100%;
	max-height: 300px;
	overflow: scroll;
	margin-top: 20px;
}
</style>
