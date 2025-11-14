<script lang="ts">
	import type {
		OnPointerUp,
		OnMount,
		OnChange,
		OnResize
	} from '$lib/types/funcs';
	import type { Item } from '$lib/types/item';
	import { gridHelp } from '$lib/utils/helper';
	import Grid from '$lib/index.svelte';

	// The cardcoded columns to span the page.
	const COL = 16;

	// NOTE: I have no fucking clue what 1287 does...
	const cols = [[1287, COL]];

	function generateLayout(col: number): Item[] {
		return new Array(10).fill(null).map(function (_, i) {
			const y = Math.ceil(Math.random() * 4) + 1;
			return {
				[COL]: gridHelp.item({
					x: (i * 2) % col,
					y: Math.floor(i / 6) * y,
					w: 2,
					h: y,
					draggable: false 
				}),
				id: crypto.randomUUID(),
				data: ''
			} as Item;
		}) as Item[];
	}

	function onResize({ cols, xPerPx, yPerPx, width }: OnResize) {
		console.log('onResize: ', cols, xPerPx, yPerPx, width);
	}

	function onChange({ unsafeItem, id, cols }: OnChange) {
		console.log('onChange: ', unsafeItem, id, cols);
	}

	function onPointerUp({ id, cols }: OnPointerUp) {
		console.log('onPointerUp: ', id, cols);
	}

	function onMount({ cols, xPerPx, yPerPx }: OnMount) {
		console.log('onMounted: ', cols, xPerPx, yPerPx);
	}

	let items: Item[] = $state(gridHelp.adjust(generateLayout(COL), COL));

	let stuckItems = $derived(
		items.map((item) => {
			return {
				...item,
				[COL]: {
					...item[COL]
					//resizable: false,
					//draggable: false,
					//customDragger: false,
					//customResizer: true,
				}
			} as Item;
		}) as Item[]
	);

	//$inspect(JSON.stringify(items));
</script>

<Grid
	bind:items={stuckItems}
	{cols}
	{onResize}
	{onMount}
	{onChange}
	{onPointerUp}
	gap={[5, 5]}
	rowHeight={50}
	fillSpace={false}
>
	{#snippet children({ movePointerDown, resizePointerDown, dataItem })}
		<div class="content">
			<div>balls</div>
			<!--
			<div onpointerdown={resizePointerDown}>resizeme</div>
			<div onpointerdown={movePointerDown}>moveme</div>
			-->
			<div>{dataItem.id}</div>
		</div>
	{/snippet}
</Grid>

<style>
	:global(body) {
		background-color: cornsilk;
	}

	.content {
		width: 100%;
		height: 100%;
		border-radius: 6px;
		background-color: red;
	}

	:global(body) {
		overflow-y: scroll;
	}

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
