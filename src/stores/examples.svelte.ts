import type { Group } from '../types/routes';
import { resolve } from '$app/paths';

export let navGroups: Group[] = $state([
	{
		title: 'Home',
		url: resolve('/'),
		open: true,
		items: [
			{
				title: 'Introduction',
				anchor: '#introduction'
			},
			{
				title: 'Getting Started',
				anchor: '#getting-started'
			}
		]
	},
	{
		title: 'Examples',
		url: resolve('/examples/'),
		open: true,
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
		url: '/usage/',
		open: true,
		items: [
			{
				title: 'Basic usage',
				anchor: '#basic-usage'
			},
			{
				title: 'How to style',
				anchor: '#how-to-style'
			},
			{
				title: 'Helper functions',
				anchor: '#helper-functions'
			},
			{
				title: 'Props',
				anchor: '#props'
			},
			{
				title: 'Exposed Types',
				anchor: '#exposed-types'
			},
			{
				title: 'Callback Parameter Types',
				anchor: '#callback-parameter-types'
			}
		]
	},
	{
		title: 'Features',
		url: '/features/',
		open: true,
		items: []
	}
]);
