<script lang="ts">
	import Grid from '../lib/index.svelte';
	import type { Item, Size } from '../lib/types/item';
	import { onMount } from 'svelte';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/xml';

	hljs.registerLanguage('javascript', javascript);

	const COL = 10;
	const cols = [[200, COL]];

	let items: Item[] = $state([
		{
			id: 'move',
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
				h: 3
			}
		},
		{
			id: 'some',
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
				w: 1,
				h: 1
			}
		},
		{
			id: 'stuff',
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
				y: 1,
				w: 1,
				h: 2
			}
		},
		{
			id: 'around',
			data: '',
			[COL]: {
				fixed: false,
				resizable: true,
				draggable: true,
				customDragger: false,
				customResizer: false,
				min: { w: 1, h: 1 },
				max: {} as Size,
				x: 8,
				y: 2,
				w: 2,
				h: 1
			}
		}
	]);

	onMount(() => {
		hljs.highlightAll();
	});
</script>

{#snippet stepOne()}
	<li>
		Start by importing the component and the <code>Item</code> type, then create
		a <code>div</code> wrapper for SG5.
	</li>
	<pre>
		<code class="language-html"
			>&lt;!-- your-component.svelte --&gt;

&lt;script lang="ts"&gt;
  import &lbrace; Grid &rbrace; from 'svelte-grid-5-ts';
  import &lbrace; Item &rbrace; from 'svelte-grid-5-ts/types';
&lt;/script&gt;

&lt;!-- Used to set the size of the grid. --&gt;
&lt;div class="sg5-wrapper"&gt;&lt;/div&gt;</code
		>
	</pre>
{/snippet}

{#snippet stepTwo()}
	<li>
		Specify the specs for the grid, then create an array with a single item. We
		then bind the items, and send the specs to the component as props.
	</li>
	<pre>
		<code class="language-html"
			>&lt;!-- your-component.svelte --&gt;

&lt;script lang="ts"&gt;
  import &lbrace; Grid &rbrace; from 'svelte-grid-5-ts';
  import &lbrace; Item &rbrace; from 'svelte-grid-5-ts/types';

  const COL = 10;              // The amount of columns for the grid.
  const cols = [[200, COL]];   // Breakpoints and columns.

  // Here is a quick summary for each property. Check out "Usage" for detailed information.

  // The items to bind. These are dynamically altered during modification.
  // Think of an "item" as a frame for your widget.
  const items: Item[] = $state([
    &lbrace;
      id: 'move',                      // Has to be unique for each item (a UUID for example).
      data: '',                        // The data you want to pass to your widget.
      [COL]: &lbrace;                         // 'COL' is used to match the grid column size.
      	fixed: false,                  // true = not movable, but resizable.
      	resizable: true,               // true = resizable, can change dimensions.
      	draggable: true,               // true = draggable, can be moved.
      	customDragger: false,          // Use a custom dragger?
      	customResizer: false,          // Use a custom resizer?
      	min: &lbrace; w: 1, h: 1 &rbrace;,           // The minimum size of this item.
      	max: &lbrace;&rbrace; as Size,               // The maximum size of this item.
      	x: 0,                          // Position or distance from the containers left border.
      	y: 0,                          // Position or distance from the containers top border.
      	w: 2,                          // The width, in columns, of the item.
      	h: 3                           // The height, in rows, of the item.
      &rbrace;
    &rbrace;
  ]);
&lt;/script&gt;

&lt;div class="sg5-wrapper"&gt;
  &lt;Grid
    bind:items
    &lbrace;cols&rbrace;
    gap=&lbrace;[2, 2]&rbrace;       &lt;!-- The gap in pixels between items --&gt;
    rowHeight=&lbrace;50&rbrace;     &lt;!-- The height of each row in pixels --&gt;
    fillSpace=&lbrace;false&rbrace;  &lt;!-- Shuffle other items to tidy up the available space? --&gt;
    fastStart          &lt;!-- Disable the animated movement when the component mounts --&gt;
  &gt;&lt;/Grid&gt;
&lt;/div&gt;</code
		>
	</pre>
{/snippet}

{#snippet stepThree()}
	<li>
		Provide a widget (a <code>div</code> here, for the sake of demo) as a
		snippet for the item to render. The <code>children</code> snippet returns
		multiple properties for us to use. Here, we use the <code>dataItem</code>
		property to receive the ID of our item, to then be used in our passed
		<code>div</code> to display the ID of the item.
	</li>
	<pre>
		<code class="language-html"
			>&lt;!-- your-component.svelte --&gt;

&lt;script lang="ts"&gt;
  import &lbrace; Grid &rbrace; from 'svelte-grid-5-ts';
  import &lbrace; Item &rbrace; from 'svelte-grid-5-ts/types';

  const COL = 10;
  const cols = [[200, COL]];

  const items: Item[] = $state([
    &lbrace;
      id: 'move',
      data: '',
      [COL]: &lbrace;
      	fixed: false,
      	resizable: true,
      	draggable: true,
      	customDragger: false,
      	customResizer: false,
      	min: &lbrace; w: 1, h: 1 &rbrace;,
      	max: &lbrace;&rbrace; as Size,
      	x: 0,
      	y: 0,
      	w: 2,
      	h: 3
      &rbrace;
    &rbrace;
  ]);
&lt;/script&gt;

&lt;div class="sg5-wrapper"&gt;
  &lt;Grid
    bind:items
    &lbrace;cols&rbrace;
    gap=&lbrace;[2, 2]&rbrace;
    rowHeight=&lbrace;50&rbrace;
    fillSpace=&lbrace;false&rbrace;
    fastStart
  &gt;
    &lt;!-- destructure the property for ease of use --&gt;
    &lbrace;#snippet children(&lbrace; dataItem &rbrace;)&rbrace;
      &lt;div class="item"&gt;&lbrace;dataItem.id&rbrace;&lt;/div&gt;
    &lbrace;/snippet&rbrace;
  &lt;/Grid&gt;
&lt;/div&gt;</code
		>
	</pre>
{/snippet}

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>
	What is svelte-grid-5-ts?<a
		id="what-is-svelte-grid-5-ts"
		aria-label="Permalink to 'What is svelte-grid-5-ts'"
		class="header-anchor"
		href="#what-is-svelte-grid-5-ts"
	></a>
</h1>
<p>
	<strong>svelte-grid-5-ts</strong> (<strong>SG5</strong>), is a
	<a
		href="https://en.wikipedia.org/wiki/Fork_(software_development)"
		target="_blank">fork</a
	>
	of <a href="https://svelte-grid.vercel.app/" target="_blank">svelte-grid</a>
	(<strong>SG</strong>), converted from Svelte 3 and JavaScript; to
	<a href="https://svelte.dev/blog/svelte-5-is-alive" target="_blank"
		>Svelte 5</a
	>
	and <a href="https://www.typescriptlang.org/">TypeScript</a>.
</p>

<p>
	SG5 serves as a
	<i>mostly</i> drop-in replacement for SG, meaning it's compatible with the same
	configuration created by projects using SG, with few exceptions due to the major
	version bump of Svelte:
</p>

<ol>
	<li>
		<p>
			Exposed event hooks; where SG uses
			<a
				href="https://svelte.dev/docs/svelte/svelte#createEventDispatcher"
				target="_blank">eventDispatcher</a
			>, SG5 uses
			<a href="https://svelte.dev/docs/svelte/$props" target="_blank"
				>function props</a
			>.
		</p>
	</li>
	<li>
		<p>
			Since SG5 uses TypeScript; types are publicly available in <code
				>/types/</code
			>.
		</p>
	</li>
</ol>

<!--
<div class="preview">
	<img alt="feature preview" src="/preview.gif" />
</div>
-->

<div class="demo">
	<Grid
		bind:items
		{cols}
		gap={[2, 2]}
		rowHeight={50}
		fillSpace={false}
		fastStart
	>
		{#snippet children({ dataItem })}
			<div class="item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>

<hr />

<h1>
	Getting Started<a
		id="getting-started"
		aria-label="Permalink to 'What is svelte-grid-5-ts'"
		class="header-anchor"
		href="#getting-started"
	></a>
</h1>

<p class="blockquote">
	If you don't already have Svelte 5 installed, <a
		href="https://svelte.dev/docs/svelte/getting-started">install it</a
	>.
</p>

<ol>
	{@render stepOne()}
	{@render stepTwo()}
	{@render stepThree()}
</ol>

<style>
	:global(.demo .svlt-grid-shadow) {
		border-radius: 5px;
	}

	h1,
	p,
	ol,
	li,
	hr,
	.demo {
		max-width: 760px;
		margin-left: auto;
		margin-right: auto;
		color: var(--sg5-c-dark-text-1);
		font-family: var(--sg5-default-font);
	}

	hr {
		border: 0;
		height: 1px;
		margin-top: 30px;
		background-color: var(--sg5-c-group-separator);
	}

	h1 {
		position: relative;
		font-size: 28px;
	}

	h1 a.header-anchor {
		position: absolute;
		left: 0;
		opacity: 0;
		margin-left: -0.87em;
		color: #a8b1ff;
		font-weight: 500;
		text-decoration: none;
		user-select: none;
		transition:
			color 250ms,
			opacity 250ms;
		&:hover {
			color: #5c73e7;
		}
		&:focus {
			opacity: 1;
		}
	}

	h1:hover a.header-anchor {
		opacity: 1;
	}

	h1 a.header-anchor::before {
		content: '#';
	}

	p {
		line-height: 28px;
		font-synthesis: style;
		text-rendering: optimizeLegibility;
		font-weight: 400;
	}

	p a {
		color: #a8b1ff;
	}

	code {
		background: var(--sg5-c-bg-text-code);
		padding: 2px 4px;
		border-radius: 5px;
	}

	.demo {
		padding: 5px;
		margin-top: 20px;
		border-radius: 10px;
		background: var(--sg5-c-bg-text-code);
	}

	.demo .item {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		color: var(--sg5-c-bg-text-code);
		width: 100%;
		height: 100%;
		padding: 2px;
		border-radius: 5px;
		background: #a8b1ff;
		user-select: none;
		word-break: break-all;
		overflow: hidden;
		font-size: clamp(0.4em, 1vw + 0.4em, 1em);
	}

	/*
	.preview {
		max-width: 770px;
		max-height: 160px;
		margin-left: auto;
		margin-right: auto;
		overflow: hidden;
		border-radius: 10px;
	}

	.preview img {
		max-width: 786px;
		margin-top: -8px;
		margin-left: -8px;
	}
	*/
</style>
