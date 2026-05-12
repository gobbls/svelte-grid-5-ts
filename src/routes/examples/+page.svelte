<script lang="ts">
import { navGroups } from '../../stores/navigation.svelte';
import type { Group } from '../../types/routes';
import CodeExampleToggle from '../../components/CodeExampleToggle.svelte';

import AddRemove from './AddRemove.svelte';
import AddRemoveString from './AddRemove.svelte?raw';
import AutoScroll from './AutoScroll.svelte';
import AutoScrollString from './AutoScroll.svelte?raw';
import Basic from './Basic.svelte';
import BasicString from './Basic.svelte?raw';
import CustomDragger from './CustomDragger.svelte';
import CustomDraggerString from './CustomDragger.svelte?raw';
import CustomResizer from './CustomResizer.svelte';
import CustomResizerString from './CustomResizer.svelte?raw';
import Events from './Events.svelte';
import EventsString from './Events.svelte?raw';
import FastStart from './FastStart.svelte';
import FastStartString from './FastStart.svelte?raw';
import FillSpace from './FillSpace.svelte';
import FillSpaceString from './FillSpace.svelte?raw';
import Fixed from './Fixed.svelte';
import FixedString from './Fixed.svelte?raw';
import Gap from './Gap.svelte';
import GapString from './Gap.svelte?raw';
import MinMaxSize from './MinMaxSize.svelte';
import MinMaxSizeString from './MinMaxSize.svelte?raw';
import Responsive from './Responsive.svelte';
import ResponsiveString from './Responsive.svelte?raw';
import ResponsiveSerializeRestore from './ResponsiveSerializeRestore.svelte';
import ResponsiveSerializeRestoreString from './ResponsiveSerializeRestore.svelte?raw';
import SerializeRestore from './SerializeRestore.svelte';
import SerializeRestoreString from './SerializeRestore.svelte?raw';

const anchors = navGroups.find((t: Group) => t.title == 'Examples')!.items;
</script>

<svelte:head>
	<title>SG5 | Examples</title>
</svelte:head>

<h1 id="examples">
	Examples<a aria-label="Permalink to 'examples'" class="header-anchor" href="#examples"></a>
</h1>

<ul>
	{#each anchors as example}
		<li><a href={example.anchor}>{example.title}</a></li>
	{/each}
</ul>

<div class="examples">
	<hr />
	<CodeExampleToggle Example={Basic} asString={BasicString} />
	<hr />
	<CodeExampleToggle Example={Gap} asString={GapString} />
	<hr />
	<CodeExampleToggle Example={Responsive} asString={ResponsiveString} />
	<hr />
	<CodeExampleToggle Example={AddRemove} asString={AddRemoveString} />
	<hr />
	<CodeExampleToggle Example={MinMaxSize} asString={MinMaxSizeString} />
	<hr />
	<CodeExampleToggle Example={Fixed} asString={FixedString} />
	<hr />
	<CodeExampleToggle Example={SerializeRestore} asString={SerializeRestoreString} />
	<hr />
	<CodeExampleToggle Example={Events} asString={EventsString} />
	<hr />
	<CodeExampleToggle Example={ResponsiveSerializeRestore} asString={ResponsiveSerializeRestoreString} />
	<hr />
	<CodeExampleToggle Example={CustomDragger} asString={CustomDraggerString} />
	<hr />
	<CodeExampleToggle Example={CustomResizer} asString={CustomResizerString} />
	<hr />
	<CodeExampleToggle Example={FastStart} asString={FastStartString} />
	<hr />
	<CodeExampleToggle Example={FillSpace} asString={FillSpaceString} />
	<hr />
	<CodeExampleToggle Example={AutoScroll} asString={AutoScrollString} />
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
