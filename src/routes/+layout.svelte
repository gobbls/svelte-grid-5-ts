<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

{#snippet chevronIcon()}
	<div class="chevron-icon-wrapper">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
				d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
			/></svg
		>
	</div>
{/snippet}

{#snippet menuIcon()}
	<div class="menu-icon-wrapper">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
				d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"
			/></svg
		>
	</div>
{/snippet}

<div id="page">
	<div id="left-sidebar">
		<div class="wrapper">
			<h2>svelte-grid-5-ts</h2>
			<nav>
				<div class="group">
					<div class="sidebar-main">
						<a href="/"><strong>Home</strong></a>
						{@render chevronIcon()}
					</div>
				</div>
				<div class="group">
					<div class="sidebar-main">
						<a href="/examples"><strong>Examples</strong></a>
						{@render chevronIcon()}
					</div>
				</div>
				<div class="group">
					<div class="sidebar-main">
						<a href="/usage"><strong>Usage</strong></a>
						{@render chevronIcon()}
					</div>
				</div>
				<div class="group">
					<div class="sidebar-main">
						<a href="/features"><strong>Features</strong></a>
						{@render chevronIcon()}
					</div>
				</div>
			</nav>
		</div>
	</div>
	<header>
		<div class="wrapper">
			<div class="left">
				{@render menuIcon()}
				<h2 id="navbar-title">svelte-grid-5-ts</h2>
			</div>
			<div class="right">
				<a href="github.com">github</a>
			</div>
		</div>
	</header>
	<main>
		<article>
			{@render children()}
		</article>
	</main>
</div>

<style>
	:root {
		--default-font:
			'Inter', ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
		--c-base: #1b1b1f;
		--c-text-link: #dfdfd6;
		--c-text-link-visited: #cccccc;
		--c-text-link-hover: #999999;
		--c-bg-main-content: var(--c-base);
		--c-bg-navbar: var(--c-base);
		--c-bg-left-sidebar: #161618;
		--c-group-separator: #2e2e32;
		--page-min-width: 750px;
		--page-max-width: 1540px;
		--header-height: 56px;
	}

	:global(html, body) {
		margin: 0;
		padding: 0;
		height: 100vh;
		width: 100%;
		background: var(--c-base);
	}

	header {
		grid-column: span 2 / span 2;
		line-height: var(--header-height);
		background: var(--c-bg-navbar);
		border-bottom: 1px solid #000000;
	}

	header .wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		max-width: var(--page-max-width);
	}

	header .wrapper .left,
	header .wrapper .right {
		padding: 0 10px;
	}

	header .wrapper .left {
		display: flex;
		flex-direction: row;
	}

	header .wrapper .left h2#navbar-title {
		display: none;
		color: var(--c-text-link);
		margin: 0 0 0 10px;
		white-space: nowrap;
	}

	header .wrapper .left .menu-icon-wrapper {
		display: none;
		align-items: center;
		box-sizing: border-box;
		height: var(--header-height);
		aspect-ratio: 1 / 1;
		padding: 12px;
		fill: var(--c-text-link);
		&:hover {
			cursor: pointer;
		}

	}

	header .wrapper .right {
		text-align: right;
	}

	main {
		max-width: var(--page-max-width);
		grid-column: span 2 / span 2;
		grid-row: span 2 / span 2;
		grid-column-start: 2;
		grid-row-start: 2;
	}

	article {
		padding: 10px;
	}

	nav {
		font-family: var(--default-font);
	}

	a {
		color: var(--c-text-link);
		text-decoration: none;
	}

	a:visited {
		color: var(--c-text-link-visited);
	}

	a:hover {
		color: var(--c-text-link-hover);
	}

	#page {
		display: grid;
		grid-template-columns: 1fr minmax(auto, var(--page-max-width)) 1fr;
		grid-template-rows: var(--header-height) 1fr;
		height: 100vh;
	}

	#left-sidebar {
		background: var(--c-bg-left-sidebar);
		grid-row: span 3 / span 3;
	}

	#left-sidebar .wrapper {
		max-width: 250px;
		margin-left: auto;
		padding: 12px 10px;
	}

	#left-sidebar .wrapper h2 {
		margin: 0 0 10px 0;
		text-wrap: nowrap;
		color: var(--c-text-link);
	}

	#left-sidebar .wrapper .group {
		padding: 10px 0;
		border-top: 1px solid var(--c-group-separator);
	}

	#left-sidebar .sidebar-main {
		font-size: 18px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	#left-sidebar .sidebar-main .chevron-icon-wrapper {
		fill: var(--c-text-link);
		height: 15px;
		aspect-ratio: 1 / 1;
		padding: 3px;
		rotate: 90deg;
		&:hover {
			cursor: pointer;
		}
	}

	@media screen and (max-width: 750px) {
		main {
			grid-column: span 3 / span 3;
		}

		#left-sidebar {
			display: none;
		}

		header .wrapper .left h2#navbar-title {
			display: block;
		}

		header .wrapper .left .menu-icon-wrapper {
			display: flex;
		}
	}
</style>
