<script lang="ts">
	import MenuIcon from "./MenuIcon.svelte";
</script>

<header>
	<div class="wrapper">
		<div class="left">
			<div class="menu-icon-wrapper">
				<MenuIcon />
			</div>
			<a href="/">
				<h2 id="navbar-title">svelte-grid-5-ts</h2>
			</a>
		</div>
		<div class="right">
			<a href="github.com">github</a>
		</div>
	</div>
</header>

<style>
	header {
		grid-column: span 2 / span 2;
		line-height: var(--header-height);
		background: var(--c-bg-navbar);
		border-bottom: 1px solid #000000;
	}

	header > .wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		max-width: var(--page-max-width);
	}

	header > .wrapper > .left,
	header .wrapper .right {
		padding: 0 10px;
	}

	header > .wrapper > .left {
		display: flex;
		flex-direction: row;
	}

	header > .wrapper > .left > a > h2#navbar-title {
		display: none;
		color: var(--c-text-link);
		margin: 0 0 0 10px;
		white-space: nowrap;
	}

	header > .wrapper > .left > .menu-icon-wrapper {
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

	header > .wrapper > .right {
		text-align: right;
	}

	@media screen and (max-width: 750px) {
		header > .wrapper > .left > .menu-icon-wrapper {
			display: flex;
		}

		header > .wrapper > .left > a > h2#navbar-title {
			display: block;
		}
	}
</style>
