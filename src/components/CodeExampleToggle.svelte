<script lang="ts">
import { type Component } from 'svelte';
import { HighlightSvelte } from 'svelte-highlight';

interface Props {
	Example: Component;
	asString: string;
}

let { Example, asString }: Props = $props();

let on: boolean = $state(false);

const untab = (svlt: string): string => svlt.replaceAll('\t', '    ');
</script>

<button
	class="wrapper"
	onclick={() => {
		on = !on;
	}}
>
	<div class="slider {on ? 'on' : ''}"></div>
	<div class="left">demo</div>
	<div class="right">code</div>
</button>

{#if on}
	<HighlightSvelte code={untab(asString)} />
{:else}
	<Example />
{/if}

<style>
.wrapper {
	all: unset;
	background: var(--sg5-c-text-link);
	border: 3px solid var(--sg5-c-indigo-1);
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(2, 1fr);
	position: relative;
	user-select: none;
	width: fit-content;
	border-radius: 8px;
	color: var(--sg5-c-dark-text-3);
	cursor: pointer;
	margin-left: auto;
	font-size: 0.8em;
}

.slider {
	background: var(--sg5-c-dark-text-1);
	height: 100%;
	position: absolute;
	width: 50%;
	border-radius: 6px;
}

.slider.on {
	right: 0;
}

.left,
.right {
	z-index: 1;
	padding: 3px;
	text-align: center;
}
</style>
