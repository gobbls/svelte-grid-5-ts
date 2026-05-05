<script lang="ts">
import { navGroups } from '../../stores/examples.svelte';
import type { Group } from '../../types/routes';
import AddRemove from './AddRemove.svelte';
import AutoScroll from './AutoScroll.svelte';
import Basic from './Basic.svelte';
import CustomDragger from './CustomDragger.svelte';
import CustomResizer from './CustomResizer.svelte';
import Events from './Events.svelte';
import FastStart from './FastStart.svelte';
import FillSpace from './FillSpace.svelte';
import Fixed from './Fixed.svelte';
import Gap from './Gap.svelte';
import MinMaxSize from './MinMaxSize.svelte';
import Responsive from './Responsive.svelte';
import ResponsiveSerializeRestore from './ResponsiveSerializeRestore.svelte';
import SerializeRestore from './SerializeRestore.svelte';

const anchors = navGroups.find((t: Group) => t.title == 'Examples')!.items;
</script>

<svelte:head>
	<title>SG5 | Examples</title>
</svelte:head>

<h1>Examples</h1>

<ul>
	{#each anchors as example}
		<li><a href={example.anchor}>{example.title}</a></li>
	{/each}
</ul>

<div class="examples">
	<hr />
	<Basic />
	<hr />
	<Gap />
	<hr />
	<Responsive />
	<hr />
	<AddRemove />
	<hr />
	<MinMaxSize />
	<hr />
	<Fixed />
	<hr />
	<SerializeRestore />
	<hr />
	<Events />
	<hr />
	<ResponsiveSerializeRestore />
	<hr />
	<CustomDragger />
	<hr />
	<CustomResizer />
	<hr />
	<FastStart />
	<hr />
	<FillSpace />
	<hr />
	<AutoScroll />
</div>

<style>
:global(.svlt-grid-resizer::after) {
	border-color: white !important;
}

:global(.svlt-grid-shadow) {
	border-radius: 6px;
	background-color: black !important;
}

:global(.svlt-grid-item) {
	border-radius: 6px;
}
</style>
