<script lang="ts">
	import Grid from '../lib/index.svelte';
	import type { Item, Size } from '../lib/types/item';

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
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>What is svelte-grid-5-ts?</h1>
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

<div class="demo">
	<Grid bind:items {cols} gap={[2, 2]} rowHeight={50} fillSpace={false}>
		{#snippet children({ dataItem })}
			<div class="item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>

<style>
	:global(.demo .svlt-grid-shadow) {
		border-radius: 5px;
	}

	h1,
	p,
	ol,
	hr,
	.demo {
		max-width: 760px;
		margin-left: auto;
		margin-right: auto;
		color: var(--c-text-link);
		font-family: var(--default-font);
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
		background: var(--c-bg-text-code);
		padding: 2px 4px;
		border-radius: 5px;
	}

	.demo {
		padding: 5px;
		border-radius: 10px;
		background: var(--c-bg-text-code);
	}

	.demo .item {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		color: var(--c-bg-text-code);
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
</style>
