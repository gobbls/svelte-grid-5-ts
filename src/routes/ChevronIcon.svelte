<script lang="ts">
	let { direction = 'left' }: { direction: 'left' | 'down' } = $props();
</script>

<div class="chevron-icon-wrapper {direction}">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
		<!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
		<path
			d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
		/></svg
	>
</div>

<style>
	.chevron-icon-wrapper {
		fill: var(--c-text-link);
		height: 15px;
		aspect-ratio: 1 / 1;
		padding: 3px;
		transition: rotate var(--expanding-transition-time) ease-in-out;
		&:hover {
			cursor: pointer;
		}
	}

	.chevron-icon-wrapper.left {
		rotate: 90deg;
	}

	.chevron-icon-wrapper.down {
		rotate: 0deg;
	}
</style>
