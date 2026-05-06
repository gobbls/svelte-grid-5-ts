<script lang="ts">
import { HighlightSvelte, Highlight } from 'svelte-highlight';
import typescript from 'svelte-highlight/languages/typescript';
import GettingStartedExampleGrid from './GettingStartedExampleGrid.svelte';
import Demo from './Demo.svelte';

const codeImports: string =
	`<script lang="ts">
  import Grid from 'svelte-grid-5-ts';
  import type { Item, Size } from 'svelte-grid-5-ts/types/item';
  import type { OnChange } from 'svelte-grid-5-ts/types/funcs';
</scr` + 'ipt>';

const codeDivWrapper: string = '<div class="sg5-wrapper"></div>';

const codeSpec: string =
	`<script lang="ts">
  /* ... */
  const COL = 10;             // The amount of columns for the grid at the current breakpoint.
  const cols = [[1200, COL]]; // Breakpoints and columns.

  /*
   * Here is a quick summary for each property.
   * Check out the "Usage" page for detailed information.
   */

  // The collection of items to bind. These are dynamically updated when moved or resized.
  // Think of an "item" as a "frame" or "container" for your widget's content.
  let items: Item[] = $state([
    {
      id: 'move me around',   // Has to be unique for each item (a UUID for example).
      data: '',               // The data you want to pass to your widget.
      [COL]: {                // 'COL' is used to match the grid column size.
      	fixed: false,         // Not draggable and wont be budged by other moving items, but can be resized.
      	resizable: true,      // If the item can be resized.
      	draggable: true,      // If the item can be dragged around.
      	customDragger: false, // If you want to use a custom dragger, maybe an icon?
      	customResizer: false, // If you want to use a custom resizer.
      	min: { w: 1, h: 1 },  // The minimum size of the item.
      	max: {} as Size,      // The maximum size of the item.
      	x: 0,                 // Distance from the containers left border.
      	y: 0,                 // Distance from the containers top border.
      	w: 2,                 // The width, in columns, of the item.
      	h: 3                  // The height, in rows, of the item.
      }
    }
  ]);
</scr` + 'ipt>';

const codeBindItems: string = `<div class="sg5-wrapper">
  <Grid
    bind:items={items}
    cols={cols}
    gap={[2, 2]}
    rowHeight={50}
    fastStart={true}
  >
  </Grid>
</div>`;

const codeEventProp: string = `<div class="sg5-wrapper">
  <Grid
    /* ... */
    onChange={handleOnChange}
  >
    {#snippet children({ dataItem }: { dataItem: Item })}
      <div class="sg5-item">{dataItem.id}</div>
    {/snippet}
  </Grid>
</div>`;

const codeEventHandler: string = `/* ... */
let updates: number = $state(0);

function handleOnChange({ ...data }: OnChange): void {
  updates++;
  console.log(\`[UPDATE: \${updates}] Have a look at the data you can use:\`, data);
};
/* ... */`;

const codeStyle: string =
	`<style>
  .sg5-wrapper {
    max-width: 760px;
    box-sizing: border-box;
    border: 1px solid white;
    background-color: #161618;
    margin-top: 30px;
  }

  .sg5-item {
    width: 100%;
    height: 100%;
    color: #161618;
    background-color: #a8b1ff;
    overflow: hidden;
  }
</sty` + 'le>';
</script>

<svelte:head>
	<title>SG5 | Home</title>
</svelte:head>

<h1 id="introduction">
	Introduction<a aria-label="Permalink to 'introduction'" class="header-anchor" href="#introduction"></a>
</h1>

<p>
	SG5 &mdash; <em>Svelte-Grid-5-TS</em> &mdash; is a fork of
	<a href="https://svelte-grid.vercel.app/" target="_blank">Svelte-grid</a>.
</p>

<p>
	SG5 supersedes Svelte-grid by converting Svelte-grid's codebase from <em>Svelte 3</em> and <em>JavaScript</em>, to
	<a href="https://svelte.dev/blog/svelte-5-is-alive" target="_blank"><strong>Svelte 5</strong></a> and
	<a href="https://www.typescriptlang.org/"><strong>TypeScript</strong></a>.
</p>

<p>
	SG5 serves as a <em>mostly</em> drop-in replacement for svelte-grid &mdash meaning it's compatible with the same configuration
	created by projects using Svelte-grid, with few exceptions due to the major version bump of Svelte:
</p>

<ol>
	<li>
		<p>
			<strong>Exposed event hooks;</strong> where Svelte-grid uses
			<a href="https://svelte.dev/docs/svelte/svelte#createEventDispatcher" target="_blank">eventDispatcher</a>, SG5
			uses <a href="https://svelte.dev/docs/svelte/$props" target="_blank">function props</a>.
		</p>
	</li>
	<li>
		<p>
			<strong>SG5 uses TypeScript;</strong> types are publicly available in <code>/types/</code>.
		</p>
	</li>
</ol>

<Demo />

<hr />

<h1 id="getting-started">
	Getting Started<a aria-label="Permalink to 'Getting Started'" class="header-anchor" href="#getting-started"></a>
</h1>

<ol>
	<li>
		Set up a project:
		<ol type="a">
			<li>
				If you don't already have Svelte 5 installed, <a href="https://svelte.dev/docs/svelte/getting-started"
					>install it</a
				>.
			</li>
			<li>
				Install <a href="https://www.npmjs.com/package/svelte-grid-5-ts">SG5</a> with
				<code>$ npm i svelte-grid-5-ts</code>
			</li>
		</ol>
	</li>

	<blockquote>
		All off these steps are done in the same <code>.svelte</code> file.
	</blockquote>

	<li>
		Start by importing the main <code>Grid</code> component and the <code>Item, Size</code> types, as well as the
		<code>OnChange</code> type, as it will be used in this example.<HighlightSvelte code={codeImports} />
	</li>

	<li>
		Create a<code>div</code> wrapper for the <code>Grid</code> component, it will be handy for listening to its size and
		target for styling. <HighlightSvelte code={codeDivWrapper} />
	</li>

	<li>
		Specify the specs for the grid, then create an array with a single item. <HighlightSvelte code={codeSpec} /> Then place
		the <code>Grid</code> component in the wrapper, bind the items and pass the specs to the component as props. <HighlightSvelte
			code={codeBindItems}
		/>
	</li>

	<li>
		Add the <code>onChange</code> event prop and pass it a function referance (we'll create the function next). Provide
		a widget &mdash; a <code>div</code> here, for the sake of example &mdash; as a snippet for the item to render. The
		<code>children</code>
		snippet returns multiple properties for us to use. Here, we use the <code>dataItem</code> property to receive the ID
		of our item to be used in our <code>div</code>. <HighlightSvelte code={codeEventProp} /> Then, create a function to fire
		when the event occurs. <Highlight language={typescript} code={codeEventHandler} />
	</li>

	<li>
		To finish off this example, add some styling to the wrapper and your widget. <HighlightSvelte code={codeStyle} /> Now,
		with all the steps applied, your example should look like this.
		<blockquote>
			Open your browser console and move the item around to see the <code>OnChange</code> function run.
		</blockquote>
		<GettingStartedExampleGrid />
	</li>
</ol>
