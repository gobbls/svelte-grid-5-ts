<script lang="ts">
import GithubIcon from './icons/GithubIcon.svelte';
import MenuIcon from './icons/MenuIcon.svelte';
import NpmIcon from './icons/NpmIcon.svelte';
import { resolve } from '$app/paths';

interface Props {
	mobile: boolean;
	menuToggle: () => void;
}

let { mobile, menuToggle }: Props = $props();
</script>

<header>
	<div class="wrapper">
		<div class="left">
			{#if mobile}
				<button onclick={menuToggle} class="nav clickable">
					<div class="icon-wrapper">
						<MenuIcon />
					</div>
				</button>
				<a href="{resolve('/')}" class="nav clickable">
					<h2 id="navbar-title">svelte-grid-5-ts</h2>
				</a>
			{/if}
		</div>
		<div class="right">
			<a href={import.meta.env.VITE_PUBLIC_NPM_URL} target="_blank" class="nav clickable">
				<div class="icon-wrapper" style:width="calc(var(--sg5-header-height) + 18px) !important">
					<NpmIcon />
				</div>
			</a>
			<a href={import.meta.env.VITE_PUBLIC_GITHUB_URL} target="_blank" class="nav clickable">
				<div class="icon-wrapper">
					<GithubIcon />
				</div>
			</a>
		</div>
	</div>
</header>

<style>
header > .wrapper {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	max-width: var(--sg5-page-max-width);
	gap: 10px;
}

header > .wrapper > .left,
header .wrapper .right {
	display: flex;
	flex-direction: row;
}

header > .wrapper > .left > a > h2#navbar-title {
	margin: 0 0 0 10px;
	white-space: nowrap;
	font-size: 1em;
}

header > .wrapper > .right {
	justify-content: right;
}

header > .wrapper .icon-wrapper {
	display: flex;
	place-items: center;
	box-sizing: border-box;
	height: var(--sg5-header-height);
	width: var(--sg5-header-height);
	padding: 10px;
	overflow: hidden;
}

header > .wrapper > .right {
	text-align: right;
}
</style>
