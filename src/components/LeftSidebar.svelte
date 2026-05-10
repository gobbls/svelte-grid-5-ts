<script lang="ts">
import type { Group } from '../types/routes';
import { slide } from 'svelte/transition';
import { onMount } from 'svelte';
import { navGroups as groups } from '../stores/examples.svelte';
import ChevronIcon from './icons/ChevronIcon.svelte';

interface Props {
	title: string;
	modal?: boolean;
}

let { title, modal }: Props = $props();

let thisModal = $state<HTMLDivElement>();

function toggleGroup(ev: MouseEvent, group: Group) {
	ev.stopPropagation();
	group.open = !group.open;
}

onMount(() => {
	if (modal) {
		thisModal?.focus();
	}
});
</script>

<div bind:this={thisModal} class="wrapper" class:modal={modal} tabindex="-1">
	<a class="nav clickable" href="/">
		<h2>{title}</h2>
	</a>
	<nav>
		{#each groups as group}
			<div class="group">
				<div class="title">
					<a class="nav clickable" href={group.url}><h4>{group.title}</h4></a>
					{#if group.items.length > 0}
						<button class="action clickable" onclick={(e) => toggleGroup(e, group)}>
							<ChevronIcon direction={group.open ? 'down' : 'left'} />
						</button>
					{/if}
				</div>
				{#if group.open}
					<div class="list" transition:slide={{ duration: 200 }}>
						{#each group.items as item}
							<ul>
								<a class="nav sub clickable" href={group.url + item.anchor}>
									<p>{item.title}</p>
								</a>
							</ul>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</nav>
</div>

<style>
.wrapper {
	box-sizing: border-box;
	height: 100%;
	max-width: var(--sg5-left-sidebar);
	margin-left: auto;
	padding: 12px 10px;
	background: var(--sg5-c-bg-left-sidebar);
	overflow-y: scroll;
}

.wrapper.modal {
	max-width: unset !important;
	width: var(--sg5-left-sidebar);
}

.wrapper > a > h2 {
	margin: 0 0 10px 0;
	text-wrap: nowrap;
}

.wrapper > nav {
	font-family: var(--sg5-default-font);
}

.wrapper > nav > .group {
	padding: 5px 0;
	border-top: 1px solid var(--sg5-c-group-separator);
}

.wrapper > nav > .group > .title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	font-size: 18px;
}

.wrapper > nav > .group > .title > a {
	width: 100%;
}

.wrapper > nav > .group > .title > a > h4 {
	padding: 5px 0;
	margin: 0;
}

.wrapper > nav > .group > .title > button {
	padding: unset;
	border: none;
	background: none;
}

.wrapper > nav > .group > .list > ul {
	padding: 0;
	margin: 0;
}

/* fixes transition snapping at end of sequence */
.wrapper > nav > .group > .list > ul:first-child {
	padding-top: 8px;
}

.wrapper > nav > .group > .list > ul:last-child {
	padding-bottom: 8px;
}

.wrapper > nav > .group > .list > ul > a > p {
	padding: 8px 0px 8px 10px;
	margin: 0;
}
</style>
