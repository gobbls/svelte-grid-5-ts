<script lang="ts">
import { HighlightSvelte, Highlight } from 'svelte-highlight';
import { typescript } from 'svelte-highlight/languages';

import BasicGridString from './_snippets/BasicGrid.svelte?raw';
import HowToStyleString from './_snippets/HowToStyle.svelte?raw';
import HelperLibString from './_snippets/HelperLib.svelte?raw';
import HelpersString from './_snippets/Helpers.svelte?raw';
import HelperItemString from './_snippets/HelperItem.svelte?raw';
import HelperItemUseString from './_snippets/HelperItemUse.svelte?raw';
import ResponsiveString from './_snippets/Responsive.svelte?raw';
import HelpersFindSpace from './_snippets/HelpersFindSpace.svelte?raw';

const untab = (svlt: string): string => svlt.replaceAll('\t', '    ');

const codeValue: string = `interface Value {
	id?: string; // For matrix generation
	fixed: boolean;
	resizable: boolean;
	draggable: boolean;
	customDragger: boolean;
	customResizer: boolean;
	min: Size | undefined;
	max: Size | undefined;
	x: number;
	y: number;
	w: number;
	h: number;
}`;

const codeItem: string = `interface Item {
	id: string;
	data: string | object;
	[key: number]: Value;
}`;

const codePartialItemValue: string = `type PartialItemValue = Partial<Value>`;

const codePosition: string = `interface Position {
	x: number;
	y: number;
}`;

const codeSize: string = `interface Size {
	w: number;
	h: number;
}`;

const codeOnResize: string = `interface OnResize {
	cols: number;
	xPerPx: number;
	yPerPx: number;
	width: number;
}`;

const codeOnChange: string = `interface OnChange {
	unsafeItem: Item;
	id: string;
	cols: number;
}`;

const codeOnMount: string = `interface OnMount {
	cols: number;
	xPerPx: number;
	yPerPx: number;
}`;

const codeOnPointerUp: string = `interface OnPointerUp {
	id: string;
	cols: number;
}`;
</script>

<svelte:head>
	<title>SG5 | Usage</title>
</svelte:head>

<h1>Usage</h1>

<!----------------------------------------------------------->

<div class="examples">
	<p>
		Use <code>Grid</code> like any other component.
	</p>

	<blockquote>
		The <a href="/examples">examples</a> page has lots of examples with toggles that lets you see the code they are made
		of!
	</blockquote>

	<hr />

	<!----------------------------------------------------------->

	<h2 id="basic-usage">The Basic Example</h2>

	<HighlightSvelte code={untab(BasicGridString)} />

	<hr />

	<!----------------------------------------------------------->

	<h2 id="how-to-style">How to Style</h2>

	<p>
		You can apply styles to a selector globally, use the <code>:global(...)</code> modifier.
	</p>

	<HighlightSvelte code={untab(HowToStyleString)} />

	<p>These are the classes used by SG5:</p>

	<ul>
		<li><code>.svlt-grid-container</code> Class name for container grid.</li>
		<li><code>.svlt-grid-item</code> Slot shell class name.</li>
		<li><code>.svlt-grid-shadow</code> Class name for the back shadow when resizing or moving an element.</li>
		<li><code>.svlt-grid-resizer</code> Class name for resizer.</li>
	</ul>

	<hr />

	<!----------------------------------------------------------->

	<h2 id="helper-functions">Helper Functions</h2>

	<p>The helper function is exported from the same location as <code>Grid</code>;</p>

	<HighlightSvelte code={untab(HelperLibString)} />

	<p>
		<code>gridHelp</code> has several tools:
	</p>

	<!----------------------------------------------------------->

	<h2><code>.item()</code></h2>

	<Highlight language={typescript} code={HelpersString} />

	<p>Returns an object with the properties necessary to create a widget. This is an object for a single widget:</p>

	<Highlight language={typescript} code={untab(HelperItemString)} />

	<p>How it's used:</p>

	<HighlightSvelte code={untab(HelperItemUseString)} />

	<ul>
		<li><code>dataItem</code> returns your item, you can use it to access your data.</li>
		<li><code>item</code> returns the item for the current breakpoint.</li>
	</ul>

	<p>You can use it for responsivness as well by specifiying an item for the right column.</p>

	<Highlight language={typescript} code={untab(ResponsiveString)} />

	<h2><code>.findSpace()</code></h2>

	<Highlight language={typescript} code={HelpersFindSpace} />

	<p>
		Find out where to place the widget in the grid by calculating from left to right. Returns a <code>Position</code>
		object of two properties <code>x</code> and <code>y</code>.
	</p>
</div>

<hr />

<!----------------------------------------------------------->

<h2 id="props">Props</h2>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Prop</th>
				<th>Type</th>
				<th>Default</th>
				<th>Required</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>items</code></td>
				<td><code>Item[]</code></td>
				<td><code>n/a</code></td>
				<td>Yes</td>
				<td>The collection of items for the grid to render.</td>
			</tr>
			<tr>
				<td><code>cols</code></td>
				<td><code>number[][]</code></td>
				<td><code>n/a</code></td>
				<td>Yes</td>
				<td
					>Specify amount of breakpoints and columns e.g <code>[[1200, 6], [1024, 5]]</code>, a breakpoint for width
					<code>1200</code>
					with <code>6</code> column and a breakpoint for width <code>1024</code> with <code>5</code> columns.</td
				>
			</tr>
			<tr>
				<td><code>gap</code></td>
				<td><code>number[]</code></td>
				<td><code>[10, 10]</code></td>
				<td>No</td>
				<td>The gap between items horizontally and vertically.</td>
			</tr>
			<tr>
				<td><code>rowHeight</code></td>
				<td><code>number</code></td>
				<td><code>n/a</code></td>
				<td>Yes</td>
				<td
					>In pixels, the height of a single row. If you set the height of a widget to <code>1</code> without gaps, the height
					of the widget will be the size you used here. When adding gaps to the vertical axis, the gap will subtract from
					the height of the widget, NOT the row.</td
				>
			</tr>
			<tr>
				<td><code>throttleUpdate</code></td>
				<td><code>number</code></td>
				<td><code>100</code></td>
				<td>No</td>
				<td>Throttle grid recalculation.</td>
			</tr>
			<tr>
				<td><code>throttleResize</code></td>
				<td><code>number</code></td>
				<td><code>100</code></td>
				<td>No</td>
				<td>Throttle grid recalculation, when the container changes its width.</td>
			</tr>
			<tr>
				<td><code>onResize</code></td>
				<td><code>(props: OnResize) =&gt; void</code></td>
				<td><code>n/a</code></td>
				<td>No</td>
				<td>The event is fired when the grid is resized.</td>
			</tr>
			<tr>
				<td><code>onChange</code></td>
				<td><code>(props: OnChange) =&gt; void</code></td>
				<td><code>n/a</code></td>
				<td>No</td>
				<td>The event is fired when an element is resized or moved.</td>
			</tr>
			<tr>
				<td><code>onMount</code></td>
				<td><code>(props: OnMount) =&gt; void</code></td>
				<td><code>n/a</code></td>
				<td>No</td>
				<td>The event is fired when the grid is mounted.</td>
			</tr>
			<tr>
				<td><code>onPointerUp</code></td>
				<td><code>(props: OnPointerUp) =&gt; void</code></td>
				<td><code>n/a</code></td>
				<td>No</td>
				<td>The event is fired when a pointer is no longer active.</td>
			</tr>
			<tr>
				<td><code>fastStart</code></td>
				<td><code>boolean</code></td>
				<td><code>false</code></td>
				<td>No</td>
				<td>Removes transition when mounted.</td>
			</tr>
			<tr>
				<td><code>fillSpace</code></td>
				<td><code>boolean</code></td>
				<td><code>false</code></td>
				<td>No</td>
				<td>Each grid element (except active element) finds its own position when movement is triggered.</td>
			</tr>
			<tr>
				<td><code>sensor</code></td>
				<td><code>number</code></td>
				<td><code>20</code></td>
				<td>No</td>
				<td>Set the distance to the bottom edge the cursor has to be within to fire the autoscroll feature.</td>
			</tr>
			<tr>
				<td><code>scroller</code></td>
				<td><code>HTMLDivElement | undefined</code></td>
				<td><code>document.DocumentElement</code></td>
				<td>No</td>
				<td>Element reference for setting <code>Element.scrollTop</code>.</td>
			</tr>
		</tbody>
	</table>
</div>

<!----------------------------------------------------------->

<h2 id="exposed-types">Exposed Types</h2>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Shape</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>Value</code></td>
				<td>
					<Highlight language={typescript} code={untab(codeValue)} />
				</td>
			</tr>
			<tr>
				<td><code>Item</code></td>
				<td>
					<Highlight language={typescript} code={untab(codeItem)} />
				</td>
			</tr>
			<tr>
				<td><code>PartialItemValue</code></td>
				<td>
					<Highlight language={typescript} code={codePartialItemValue} />
				</td>
			</tr>
			<tr>
				<td><code>Position</code></td>
				<td>
					<Highlight language={typescript} code={untab(codePosition)} />
				</td>
			</tr>
			<tr>
				<td><code>Size</code></td>
				<td>
					<Highlight language={typescript} code={untab(codeSize)} />
				</td>
			</tr>
		</tbody>
	</table>
</div>

<!----------------------------------------------------------->

<h2 id="callback-parameter-types">Callback Parameter Types</h2>

<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Shape</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td><code>OnResize</code></td>
				<td>
					<Highlight language={typescript} code={untab(codeOnResize)} />
				</td>
			</tr>
			<tr>
				<td><code>OnChange</code></td>
				<td>
					<Highlight language={typescript} code={untab(codeOnChange)} />
				</td>
			</tr>
			<tr>
				<td><code>OnMount</code></td>
				<td>
					<Highlight language={typescript} code={untab(codeOnMount)} />
				</td>
			</tr>
			<tr>
				<td><code>OnPointerUp</code></td>
				<td>
					<Highlight language={typescript} code={untab(codeOnPointerUp)} />
				</td>
			</tr>
		</tbody>
	</table>
</div>

<!----------------------------------------------------------->

<style>
table {
	border-collapse: collapse;
	color: var(--sg5-c-dark-text-1);
	max-width: 1200px;
	width: 100%;
	font-family: var(--sg5-default-font);
}

table thead {
	font-size: 1.2em;
	text-align: left;
	border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
}

table thead th {
	padding: 0 20px 4px 8px;
}

table tbody td {
	padding: 6px 10px;
	border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
}

table thead th,
table tbody td {
	border-right: 1px dashed rgba(255, 255, 255, 0.2);
}

table tbody tr td:last-of-type,
table thead tr th:last-of-type {
	min-width: 500px;
	border-right: none;
}

table code {
	white-space: nowrap;
}

.table-wrapper {
	max-width: 760px;
	overflow-x: scroll;
	margin: 0 auto;
	padding-bottom: 15px;
}
</style>
