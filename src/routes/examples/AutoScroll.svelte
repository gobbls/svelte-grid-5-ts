<script lang="ts">
import Grid from '../../lib/index.svelte';
import type { Item, Size } from '../../lib/types/item';
import { onMount } from 'svelte';
import javascript from 'highlight.js/lib/languages/javascript';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);

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
let scroller: HTMLDivElement | undefined = $state();
let useDocument: boolean = $state(false);
let sensor: number = $state(20);

onMount(() => {
	documentContainer = document.getElementsByTagName('main')[0] as HTMLDivElement;
	scroller = container;
	hljs.highlightAll();
});

$effect(() => {
	scroller = useDocument ? documentContainer : container;
});
</script>

<h1 id="autoscroll">Autoscroll</h1>

<p>Simple auto-scrolling that only requires a reference to your container.</p>

<p>
	Autoscrolling occurs when the cursor is close to the edges of your container. This does not happen when the bottom or
	top of your widget is close to the edges
</p>

<label>
	<input type="checkbox" bind:checked={useDocument} />
	Use document
</label>

<pre>
	<code class="language-html tag-svelte-script"
		>&lt;!-- You can use a custom container as a scroll target --&gt;
&lt;div bind:this=&lbrace;container&rbrace;&gt;
  &lt;Grid &lbrace;...&rbrace; scroller=&lbrace;container&rbrace; /&gt;
&lt;/div&gt;

&lt;script&gt;
let container;
&lt;/script&gt;</code
	>
</pre>

<label>
	Sensor value
	<input type="number" size="5" bind:value={sensor} />
</label>

<blockquote>Set the distance from the cursor to the edge (The default value is 20)</blockquote>

<div class="demo" class:container={!useDocument} bind:this={container}>
	<Grid bind:items={items} cols={cols} gap={[5, 5]} rowHeight={100} scroller={scroller} sensor={sensor}>
		{#snippet children()}
			<div class="item"></div>
		{/snippet}
	</Grid>
</div>

<style>
pre {
	margin: unset;
}

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
