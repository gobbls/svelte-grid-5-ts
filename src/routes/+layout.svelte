<script lang="ts">
	import './style.css';
	import type { Group } from './LeftSidebar.svelte';
	import type { Snippet } from 'svelte';
	import LeftSidebar from './LeftSidebar.svelte';
	import Header from './Header.svelte';

	let { children }: { children: Snippet } = $props();

	let leftSidebarGroups: Group[] = $state([
		{
			title: 'Home',
			url: '/',
			open: false,
			items: [
				{
					title: 'What is svelte-grid-5-ts?',
					anchor: '#what-is-svelte-grid-5-ts'
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
				},
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
		},
	]);
</script>

<div id="page">
	<div id="left-sidebar">
		<LeftSidebar groups={leftSidebarGroups} title="svelte-grid-5-ts" />
	</div>
	<Header />
	<main>
		<article>
			{@render children()}
		</article>
	</main>
</div>

<style>
	main {
		max-width: var(--page-max-width);
		grid-column: span 2 / span 2;
		grid-row: span 2 / span 2;
		grid-column-start: 2;
		grid-row-start: 2;
		overflow-y: scroll;
		overflow: hidden;
	}

	main article {
		padding: 10px 20px;
	}

	#page {
		display: grid;
		grid-template-columns:
			1fr minmax(auto, calc(var(--page-max-width) - var(--left-sidebar) - 20px))
			1fr;
		grid-template-rows: var(--header-height) 1fr;
		height: 100vh;
	}

	#left-sidebar {
		background: var(--c-bg-left-sidebar);
		grid-row: span 3 / span 3;
	}
	/************************************************/

	@media screen and (max-width: 750px) {
		main {
			grid-column: span 3 / span 3;
		}

		#left-sidebar {
			display: none;
		}
	}
</style>
