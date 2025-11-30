<script lang="ts">
	import Grid from '../lib/index.svelte';
	import type { Item, Size } from '../lib/types/item';
	import { onMount } from 'svelte';
	import hljs from 'highlight.js/lib/core';
	import xml from 'highlight.js/lib/languages/xml';
	import javascript from 'highlight.js/lib/languages/javascript';
	import css from 'highlight.js/lib/languages/css';
	import GettingStartedExampleGrid from './GettingStartedExampleGrid.svelte';

	hljs.registerLanguage('xml', xml);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('css', css);

	const COL = 10;
	const cols = [[200, COL]];

	let items: Item[] = $state([
		{
			id: 'move me around',
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

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1 id="what-is-svelte-grid-5-ts">
	What is svelte-grid-5-ts?<a
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

<h1 id="getting-started">
	Getting Started<a
		aria-label="Permalink to 'What is svelte-grid-5-ts'"
		class="header-anchor"
		href="#getting-started"
	></a>
</h1>

<ul class="blockquote">
	<li>
		If you don't already have Svelte 5 installed, <a
			href="https://svelte.dev/docs/svelte/getting-started">install it</a
		>, and start a development server.
	</li>
	<li>
		All off these steps are done in the same <code>.svelte</code> file.
	</li>
</ul>

<ol>
	<li>
		Start by importing the component and the <code>Item, Size</code> types, as
		well as the <code>OnChange</code> type, the event function we will utilize in
		this example -
	</li>
	<pre>
		<code class="language-html tag-svelte-script"
			>&lt;script lang="ts"&gt;
  import Grid from 'svelte-grid-5-ts';
  import type &lbrace; Item, Size &rbrace; from 'svelte-grid-5-ts/types/item';
  import type &lbrace; OnChange &rbrace; from 'svelte-grid-5-ts/types/funcs';
&lt;/script&gt;</code
		>
	</pre>

	and create a<code>div</code> wrapper for SG5.
	<pre>
		<code class="language-html tag-svelte-template"
			>&lt;div class="sg5-wrapper"&gt;&lt;/div&gt;</code
		>
	</pre>

	<li>
		Specify the specs for the grid, then create an array with a single item.
	</li>
	<pre>
		<code class="language-html tag-svelte-script"
			>&lt;script lang="ts"&gt;
  // ...
  const COL = 10;            // The amount of columns for the grid.
  const cols = [[200, COL]]; // Breakpoints and columns.

  /*
   * Here is a quick summary for each property.
   * Check out the "Usage" page for detailed information.
   */

  // The items to bind. These are dynamically altered during modification.
  // Think of an "item" as a frame for your widget.
  let items: Item[] = $state([
    &lbrace;
      id: 'move me around',   // Has to be unique for each item (a UUID for example).
      data: '',               // The data you want to pass to your widget.
      [COL]: &lbrace;                // 'COL' is used to match the grid column size.
      	fixed: false,         // true = not movable, but resizable.
      	resizable: true,      // true = resizable, can change dimensions.
      	draggable: true,      // true = draggable, can be moved.
      	customDragger: false, // Use a custom dragger?
      	customResizer: false, // Use a custom resizer?
      	min: &lbrace; w: 1, h: 1 &rbrace;,  // The minimum size of this item.
      	max: &lbrace;&rbrace; as Size,      // The maximum size of this item.
      	x: 0,                 // Position or distance from the containers left border.
      	y: 0,                 // Position or distance from the containers top border.
      	w: 2,                 // The width, in columns, of the item.
      	h: 3                  // The height, in rows, of the item.
      &rbrace;
    &rbrace;
  ]);
&lt;/script&gt;</code
		>
	</pre>

	We then bind the items and pass the specs to the component as props.
	<pre>
		<code class="language-html tag-svelte-template"
			>&lt;div class="sg5-wrapper"&gt;
  &lt;Grid
    bind:items
    &lbrace;cols&rbrace;
    gap=&lbrace;[2, 2]&rbrace;      &lt;!-- The gap in pixels between items --&gt;
    rowHeight=&lbrace;50&rbrace;    &lt;!-- The height of each row in pixels --&gt;
    fillSpace=&lbrace;false&rbrace; &lt;!-- Shuffle other items to tidy up the available space? --&gt;
    fastStart         &lt;!-- Disable the animated movement when the component mounts --&gt;
  &gt;&lt;/Grid&gt;
&lt;/div&gt;</code
		>
	</pre>

	<li>
		Add the <code>onChange</code> event prop and pass it a function referance.<br
		/>
		Provide a widget (a <code>div</code> here, for the sake of example) as a
		snippet for the item to render.<br /> The <code>children</code> snippet
		returns multiple properties for us to use. Here, we use the
		<code>dataItem</code>
		property to receive the ID of our item, to then be used in our passed
		<code>div</code> to display the ID of the item.
	</li>
	<pre>
		<code class="language-html tag-svelte-template"
			>&lt;div class="sg5-wrapper"&gt;
  &lt;Grid
    ...
    onChange=&lbrace;handleOnChange&rbrace;
  &gt;
    &lbrace;#snippet children(&lbrace; dataItem &rbrace;)&rbrace;
      &lt;div class="sg5-item"&gt;&lbrace;dataItem.id&rbrace;&lt;/div&gt;
    &lbrace;/snippet&rbrace;
  &lt;/Grid&gt;
&lt;/div&gt;</code
		>
	</pre>

	Then, create the function to handle the event.
	<pre>
		<code class="language-html tag-svelte-script"
			>&lt;script lang="ts"&gt;
  // ...
  // Let's keep track of all the updates that happens.
  let updates: number = $state(0);

  // For ease of use, simply spread the object properties.
  function handleOnChange(&lbrace; ...data &rbrace;: OnChange): void &lbrace;
    updates++;
    console.log(
      `[UPDATE: $&lbrace;updates&rbrace;] Have a look at the data we can use:`,
      data
    );
  &rbrace;
&lt;/script&gt;</code
		>
	</pre>

	<li>
		Then, to finish off this example, add some styling to the wrapper and your
		widget.
	</li>
	<pre>
		<code class="language-html tag-svelte-style"
			>&lt;style&gt;
  .sg5-wrapper &lbrace;
    max-width: 760px;
    box-sizing: border-box;
    border: 1px solid white;
    background-color: #161618;
    margin-top: 30px;
  &rbrace;

  .sg5-item &lbrace;
    width: 100%;
    height: 100%;
    color: #161618;
    background-color: #a8b1ff;
    overflow: hidden;
  &rbrace;
&lt;/style&gt;</code
		>
	</pre>

	Now, with all the steps applied, your example should look like this.<br />
	<i> Open your browser console and move the item around to see the </i><code
		>OnChange</code
	><i> function run. </i>

	<GettingStartedExampleGrid />
</ol>

<style>
	:global(.demo .svlt-grid-shadow) {
		border-radius: 5px;
	}

	h1,
	p,
	ol,
	ul,
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
		scroll-margin-top: 50px;
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

	ol {
		padding-left: 1em;
	}

	p a,
	ul a {
		color: #a8b1ff;
	}

	/*
	 * compansate for whitespace blocks making
	 * the <pre> block heigher than wanted.
	 */
	pre {
		margin-top: -1em;
		margin-bottom: -1em;
	}

	code {
		position: relative;
		background: var(--sg5-c-bg-text-code);
		padding: 2px 4px;
		border-radius: 5px;
	}

	code.language-html.tag-svelte-script::before,
	code.language-html.tag-svelte-template::before,
	code.language-html.tag-svelte-style::before {
		position: absolute;
		top: 2px;
		right: 2px;
		padding: 3px 5px;
		border-radius: 3px;
		background: rgba(0, 0, 0, 0.3);
	}

	code.language-html.tag-svelte-script::before {
		content: 'Svelte5 script';
	}

	code.language-html.tag-svelte-template::before {
		content: 'Svelte5 template';
	}

	code.language-html.tag-svelte-style::before {
		content: 'Svelte5 style';
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
