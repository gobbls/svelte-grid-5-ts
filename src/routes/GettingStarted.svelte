<script lang="ts">
import GettingStartedExampleGrid from './GettingStartedExampleGrid.svelte';
</script>

<h1 id="getting-started">
	Getting Started<a aria-label="Permalink to 'What is svelte-grid-5-ts'" class="header-anchor" href="#getting-started"
	></a>
</h1>

<ul class="blockquote">
	<li>
		If you don't already have Svelte 5 installed, <a href="https://svelte.dev/docs/svelte/getting-started">install it</a
		>, and start a development server.
	</li>
	<li>
		All off these steps are done in the same <code>.svelte</code> file.
	</li>
</ul>

<ol>
	<li>
		Start by importing the component and the <code>Item, Size</code> types, as well as the <code>OnChange</code> type, the
		event function we will utilize in this example -
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
		<code class="language-html tag-svelte-template">&lt;div class="sg5-wrapper"&gt;&lt;/div&gt;</code>
	</pre>

	<li>Specify the specs for the grid, then create an array with a single item.</li>
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
		Add the <code>onChange</code> event prop and pass it a function referance.<br />
		Provide a widget (a <code>div</code> here, for the sake of example) as a snippet for the item to render.<br /> The
		<code>children</code>
		snippet returns multiple properties for us to use. Here, we use the
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

	<li>Then, to finish off this example, add some styling to the wrapper and your widget.</li>
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
	<i> Open your browser console and move the item around to see the </i><code>OnChange</code><i> function run. </i>

	<GettingStartedExampleGrid />
</ol>
