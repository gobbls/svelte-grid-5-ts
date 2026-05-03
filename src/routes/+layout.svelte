<script lang="ts">
import 'highlight.js/styles/base16/ashes.css';
import './style.css';
import type { Snippet } from 'svelte';
import { cubicInOut } from 'svelte/easing';
import { slide } from 'svelte/transition';
import LeftSidebar from '../components/LeftSidebar.svelte';
import Header from '../components/Header.svelte';

let { children }: { children: Snippet } = $props();

const MOBILE_BREAKPOINT = 800;

let showLeftModal = $state(false);
let innerWidth: number = $state(0);

const blurPageStyle = $derived(`filter: ${showLeftModal && innerWidth < MOBILE_BREAKPOINT ? 'blur(4px)' : 'none'}`);

const showModal = $derived(showLeftModal && innerWidth <= MOBILE_BREAKPOINT);

const ignoreAction = (ev: MouseEvent) => ev.stopPropagation();

const toggleModalOn = () => (showLeftModal = true);

function dismissModal(ev: MouseEvent) {
	ev.stopPropagation();
	showLeftModal = false;
}

function dismissModalWithKey(ev: KeyboardEvent) {
	ev.stopPropagation();
	if (ev.key === 'Escape') {
		showLeftModal = false;
	}
}
</script>

<svelte:window bind:innerWidth={innerWidth} />

{#if showModal}
	<div
		role="dialog"
		class="modal"
		aria-modal={showModal}
		aria-hidden={!showModal}
		onclick={dismissModal}
		transition:slide={{ duration: 200, axis: 'x', easing: cubicInOut }}
	>
		<div role="none" class="left-sidebar" onclick={ignoreAction} onkeydown={dismissModalWithKey}>
			<LeftSidebar modal title="svelte-grid-5-ts" />
		</div>
	</div>
{/if}

<div class="page" style={blurPageStyle}>
	<div class="left-sidebar">
		{#if innerWidth > MOBILE_BREAKPOINT}
			<LeftSidebar title="svelte-grid-5-ts" />
		{/if}
	</div>
	<div class="header">
		<Header menuToggle={toggleModalOn} mobile={innerWidth <= MOBILE_BREAKPOINT} />
	</div>
	<main>
		<article>
			{@render children()}
		</article>
	</main>
</div>

<style>
.page {
	display: grid;
	grid-template-columns:
		1fr minmax(auto, calc(var(--sg5-page-max-width) - var(--sg5-left-sidebar)))
		1fr;
	grid-template-rows: var(--sg5-header-height) 1fr;
	height: 100vh;
	transition: filter 200ms ease;
}

.page > main {
	grid-column-start: 2;
	grid-row-start: 2;
	grid-column: span 2 / span 2;
	grid-row: span 2 / span 2;
	overflow-y: scroll;
	/*
	 * breaks the demo autoscroll
	 *
	scroll-behavior: smooth;
	*/
}

.page > main > article {
	flex: 1;
	box-sizing: border-box;
	padding: 16px 24px;
	max-width: var(--sg5-page-max-width);
}

.page > .left-sidebar {
	grid-row: span 3 / span 3;
	background: var(--sg5-c-bg-left-sidebar);
}

.page > .header {
	z-index: 2;
	grid-column: span 2 / span 2;
	line-height: var(--sg5-header-height);
	background: var(--sg5-c-bg-navbar);
	border-bottom: 1px solid black;
	box-shadow:
		0 20px 20px -20px var(--sg5-c-bg-navbar),
		0 20px 20px -20px var(--sg5-c-bg-navbar);
}

.modal {
	z-index: 1;
	position: absolute;
	width: 100%;
	height: 100%;
}

.modal > .left-sidebar {
	height: 100%;
	width: fit-content;
	box-shadow: 0 0 50px 1px rgba(0, 0, 0, 0.5);
}
</style>
