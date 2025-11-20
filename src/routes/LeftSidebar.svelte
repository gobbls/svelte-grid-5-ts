<script module lang="ts">
	export interface Group {
		title: string;
		url: string;
		open: boolean;
		items: {
			title: string;
			anchor: string;
		}[];
	}
</script>

<script lang="ts">
	import ChevronIcon from './ChevronIcon.svelte';
	import { slide } from 'svelte/transition';

	let {
		groups = $bindable([]),
		title
	}: {
		groups: Group[];
		title: string;
	} = $props();
</script>

<div class="wrapper">
	<a href="/">
		<h2>{title}</h2>
	</a>
	<nav>
		{#each groups as group}
			<div class="group">
				<div class="main">
					<a href={group.url}><strong>{group.title}</strong></a>
					<button onclick={() => (group.open = !group.open)}>
						<ChevronIcon direction={group.open ? 'down' : 'left'} />
					</button>
				</div>
				{#if group.open}
					<div class="list" transition:slide={{ duration: 200 }}>
						{#each group.items as item}
							<ul><a href={group.url + item.anchor}>{item.title}</a></ul>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</nav>
</div>

<style>
	a,
	ul {
		color: var(--c-text-link);
		text-decoration: none;
	}

	a:hover {
		color: var(--c-text-link-hover);
	}

	.wrapper {
		max-width: var(--left-sidebar);
		margin-left: auto;
		padding: 12px 10px;
	}

	.wrapper > a > h2 {
		margin: 0 0 10px 0;
		text-wrap: nowrap;
	}

	.wrapper > nav {
		font-family: var(--default-font);
	}

	.wrapper > nav > .group {
		padding: 10px 0;
		border-top: 1px solid var(--c-group-separator);
	}

	.wrapper > nav > .group > .main {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 18px;
	}

	.wrapper > nav > .group > .main > button {
		all: unset;
	}

	/* fixes transition snapping at end of sequence */
	.wrapper > nav > .group > .list > ul:first-child {
		padding-top: 16px;
		margin-top: 0;
	}

	.wrapper > nav > .group > .list > ul:last-child {
		padding-bottom: 16px;
		margin-bottom: 0;
	}
</style>
