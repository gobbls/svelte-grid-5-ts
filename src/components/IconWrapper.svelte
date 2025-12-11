<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		size: number;
		color: string;
	}

	let { children, size, color }: Props = $props();
</script>

<div
	style:color
	style:stroke={color}
	style:fill={color}
	style:width="{size}px"
	style:aspect-ratio="1 / 1"
>
	{@render children()}
</div>
