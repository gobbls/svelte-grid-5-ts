<script lang="ts">
import { HighlightSvelte, Highlight } from 'svelte-highlight';
import typescript from 'svelte-highlight/languages/typescript';

import Demo from './Demo.svelte';
import GettingStartedExampleGrid from './GettingStartedExampleGrid.svelte';

import SpecString from './_snippets/Spec.svelte?raw';
import ImportsString from './_snippets/Imports.svelte?raw';
import DivWrapperString from './_snippets/DivWrapper.svelte?raw';
import BindItemsString from './_snippets/BindItems.svelte?raw';
import EventPropString from './_snippets/EventProp.svelte?raw';
import EventHandlerString from './_snippets/EventHandler.svelte?raw';
import StyleString from './_snippets/Style.svelte?raw';

const untab = (svlt: string): string => svlt.replaceAll('\t', '    ');
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
		<code>OnChange</code> type, as it will be used in this example.
		<HighlightSvelte code={ImportsString} />
	</li>

	<li>
		Create a<code>div</code> wrapper for the <code>Grid</code> component, it will be handy for listening to its size and
		target for styling.
		<HighlightSvelte code={DivWrapperString} />
	</li>

	<li>
		Specify the specs for the grid, then create an array with a single item.
		<HighlightSvelte code={untab(SpecString)} />
	</li>

	<li>
		Place the <code>Grid</code> component in the wrapper, bind the items and pass the specs to the component as props.
		<HighlightSvelte code={untab(BindItemsString)} />
	</li>

	<li>
		Add the <code>onChange</code> event prop and pass it a function referance (we'll create the function next). Provide
		a widget &mdash; a <code>div</code> here, for the sake of example &mdash; as a snippet for the item to render. The
		<code>children</code>
		snippet returns multiple properties for us to use. Here, we use the <code>dataItem</code> property to receive the ID
		of our item to be used in our <code>div</code>.
		<HighlightSvelte code={untab(EventPropString)} />
	</li>

	<li>
		Create a function to fire when the event occurs.
		<Highlight language={typescript} code={untab(EventHandlerString)} />
	</li>

	<li>
		To finish off this example, add some styling to the wrapper and your widget.
		<HighlightSvelte code={untab(StyleString)} />

		Now, with all the steps applied, your example should look like this.

		<blockquote>
			Open your browser console and move the item around to see the <code>OnChange</code> function run.
		</blockquote>

		<GettingStartedExampleGrid />
	</li>
</ol>
