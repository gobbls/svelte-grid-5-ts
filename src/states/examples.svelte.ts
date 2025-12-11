import type { Group } from '../types/routes';

export let navGroups: Group[] = $state([
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
