<script lang="ts">
	import './style.css';
	import 'highlight.js/styles/base16/ashes.css';
	import type { Snippet } from 'svelte';
	import type { Group } from './LeftSidebar.svelte';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	import LeftSidebar from './LeftSidebar.svelte';
	import Header from './Header.svelte';

	let { children }: { children: Snippet } = $props();

	const MOBILE_BREAKPOINT = 800;

	let showLeftModal = $state(false);
	let innerWidth: number = $state(0);

	let navGroups: Group[] = $state([
		{
			title: 'Home',
			url: '/',
			open: false,
			items: [
				{
					title: 'What is svelte-grid-5-ts?',
					anchor: '#what-is-svelte-grid-5-ts'
				},
				{
					title: 'Getting Started',
					anchor: '#getting-started'
				}
			]
		},
		{
			title: 'Examples',
			url: '/examples',
			open: false,
			items: [
				{
					title: 'Basic',
					anchor: '#basic'
				},
				{
					title: 'Gap',
					anchor: '#gap'
				},
				{
					title: 'Responsive',
					anchor: '#responsive'
				},
				{
					title: 'Add/Remove',
					anchor: '#add-remove'
				},
				{
					title: 'Min/Max size',
					anchor: '#min-max-size'
				},
				{
					title: 'Fixed',
					anchor: '#fixed'
				},
				{
					title: 'Serialize/Restore',
					anchor: '#serialize-restore'
				},
				{
					title: 'Events',
					anchor: '#events'
				},
				{
					title: 'Responsive - Serialize/Restore',
					anchor: '#responsive-serialize-restore'
				},
				{
					title: 'Custom dragger',
					anchor: '#custom-dragger'
				},
				{
					title: 'Custom resizer',
					anchor: '#custom-resizer'
				},
				{
					title: 'Fast start',
					anchor: '#fast-start'
				},
				{
					title: 'Fill space',
					anchor: '#fill-space'
				},
				{
					title: 'Autoscroll',
					anchor: '#autoscroll'
				}
			]
		},
		{
			title: 'Usage',
			url: '/usage',
			open: false,
			items: [
				{
					title: 'What is svelte-grid-5-ts?',
					anchor: '#what-is-svelte-grid-5-ts'
				}
			]
		},
		{
			title: 'Features',
			url: '/features',
			open: false,
			items: [
				{
					title: 'What is svelte-grid-5-ts?',
					anchor: '#what-is-svelte-grid-5-ts'
				}
			]
		}
	]);

	const blurPageStyle = $derived(
		`filter: ${showLeftModal && innerWidth < MOBILE_BREAKPOINT ? 'blur(4px)' : 'none'}`
	);

	const showModal = $derived(showLeftModal && innerWidth <= MOBILE_BREAKPOINT);

	function ignoreAction(ev: MouseEvent) {
		ev.stopPropagation();
	}

	function toggleModalOn() {
		showLeftModal = true;
	}

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

<svelte:window bind:innerWidth />

{#if showModal}
	<div
		role="dialog"
		class="modal"
		aria-modal={showModal ? 'true' : 'false'}
		aria-hidden={showModal ? 'false' : 'true'}
		onclick={dismissModal}
		transition:slide={{ duration: 200, axis: 'x', easing: cubicInOut }}
	>
		<div
			role="none"
			class="left-sidebar"
			onclick={ignoreAction}
			onkeydown={dismissModalWithKey}
		>
			<LeftSidebar modal title="svelte-grid-5-ts" bind:groups={navGroups} />
		</div>
	</div>
{/if}

<div class="page" style={blurPageStyle}>
	<div class="left-sidebar">
		{#if innerWidth > MOBILE_BREAKPOINT}
			<LeftSidebar title="svelte-grid-5-ts" bind:groups={navGroups} />
		{/if}
	</div>
	<div class="header">
		<Header
			menuToggle={toggleModalOn}
			mobile={innerWidth <= MOBILE_BREAKPOINT}
		/>
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
			1fr minmax(
				auto,
				calc(var(--sg5-page-max-width) - var(--sg5-left-sidebar) - 20px)
			)
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
		max-width: var(--sg5-page-max-width);
		overflow-y: scroll;
		scroll-behavior: smooth;
	}

	.page > main > article {
		padding: 16px 24px;
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
		border-bottom: 1px solid var(--sg5-c-dark-base);
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
