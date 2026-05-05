<script lang="ts">
import { HighlightSvelte } from 'svelte-highlight';
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
  const COL = 10;             // The amount of columns for the grid.
  const cols = [[1200, COL]]; // Breakpoints and columns.

  /*
   * Here is a quick summary for each property.
   * Check out the "Usage" page for detailed information.
   */

  // The items to bind. These are dynamically altered during modification.
  // Think of an "item" as a "frame" for your widget.
  let items: Item[] = $state([
    {
      id: 'move me around',   // Has to be unique for each item (a UUID for example).
      data: '',               // The data you want to pass to your widget.
      [COL]: {                // 'COL' is used to match the grid column size.
      	fixed: false,         // true = not movable, but resizable.
      	resizable: true,      // true = resizable, can change dimensions.
      	draggable: true,      // true = draggable, can be moved.
      	customDragger: false, // Use a custom dragger?
      	customResizer: false, // Use a custom resizer?
      	min: { w: 1, h: 1 },  // The minimum size of this item.
      	max: {} as Size,      // The maximum size of this item.
      	x: 0,                 // Position or distance from the containers left border.
      	y: 0,                 // Position or distance from the containers top border.
      	w: 2,                 // The width, in columns, of the item.
      	h: 3                  // The height, in rows, of the item.
      }
    }
  ]);
</scr` + 'ipt>';

const codeBindItems: string = `<div class="sg5-wrapper">
  <Grid
    bind:items
    {cols}
    gap={[2, 2]}
    rowHeight={50}
    fillSpace={false}
    fastStart
  ></Grid>
</div>`;

const codeEventProp: string = `<div class="sg5-wrapper">
  <Grid onChange={handleOnChange}>
    {#snippet children({ dataItem }: { dataItem: Item })}
      <div class="sg5-item">{dataItem.id}</div>
    {/snippet}
  </Grid>
</div>`;

const codeEventHandler: string =
	`<script lang="ts">
  let updates: number = $state(0);

  function handleOnChange({ data }: OnChange): void {
    updates++;
    console.log(\`[UPDATE: \${updates}] Have a look at the data we can use:\`, data);
  }
</scr` + 'ipt>';

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

<h1 id="what-is-svelte-grid-5-ts">
	What is svelte-grid-5-ts?<a
		aria-label="Permalink to 'What is svelte-grid-5-ts'"
		class="header-anchor"
		href="#what-is-svelte-grid-5-ts"
	></a>
</h1>

<p>
	<strong>svelte-grid-5-ts</strong> (<strong>SG5</strong>), is a
	<a href="https://en.wikipedia.org/wiki/Fork_(software_development)" target="_blank">fork</a>
	of <a href="https://svelte-grid.vercel.app/" target="_blank">svelte-grid</a> (<strong>SG</strong>), converted from
	Svelte 3 and JavaScript; to <a href="https://svelte.dev/blog/svelte-5-is-alive" target="_blank">Svelte 5</a> and
	<a href="https://www.typescriptlang.org/">TypeScript</a>.
</p>

<p>
	SG5 serves as a <i>mostly</i> drop-in replacement for SG, meaning it's compatible with the same configuration created by
	projects using SG, with few exceptions due to the major version bump of Svelte:
</p>

<ol>
	<li>
		<p>
			Exposed event hooks; where SG uses <a
				href="https://svelte.dev/docs/svelte/svelte#createEventDispatcher"
				target="_blank">eventDispatcher</a
			>, SG5 uses <a href="https://svelte.dev/docs/svelte/$props" target="_blank">function props</a>.
		</p>
	</li>
	<li>
		<p>
			Since SG5 uses TypeScript; types are publicly available in <code>/types/</code>.
		</p>
	</li>
</ol>

<Demo />

<hr />

<h1 id="getting-started">
	Getting Started<a aria-label="Permalink to 'What is svelte-grid-5-ts'" class="header-anchor" href="#getting-started"
	></a>
</h1>

<blockquote>
	<ul>
		<li>
			If you don't already have Svelte 5 installed, <a href="https://svelte.dev/docs/svelte/getting-started"
				>install it</a
			>, and start a development server.
		</li>
		<li>
			All off these steps are done in the same <code>.svelte</code> file.
		</li>
	</ul>
</blockquote>

<ol>
	<li>
		Start by importing the component and the <code>Item, Size</code> types, as well as the <code>OnChange</code> type, the
		event function we will utilize in this example -
	</li>
	<HighlightSvelte code={codeImports} />

	and create a<code>div</code> wrapper for SG5.
	<HighlightSvelte code={codeDivWrapper} />

	<li>Specify the specs for the grid, then create an array with a single item.</li>
	<HighlightSvelte code={codeSpec} />

	We then bind the items and pass the specs to the component as props.
	<HighlightSvelte code={codeBindItems} />

	<li>
		Add the <code>onChange</code> event prop and pass it a function referance.<br /> Provide a widget (a
		<code>div</code>
		here, for the sake of example) as a snippet for the item to render.<br /> The <code>children</code> snippet returns
		multiple properties for us to use. Here, we use the <code>dataItem</code> property to receive the ID of our item, to
		then be used in our passed <code>div</code> to display the ID of the item.
	</li>
	<HighlightSvelte code={codeEventProp} />

	Then, create the function to handle the event.
	<HighlightSvelte code={codeEventHandler} />

	<li>Then, to finish off this example, add some styling to the wrapper and your widget.</li>
	<HighlightSvelte code={codeStyle} />

	Now, with all the steps applied, your example should look like this.<br />
	<i> Open your browser console and move the item around to see the </i><code>OnChange</code><i> function run. </i>

	<GettingStartedExampleGrid />
</ol>
