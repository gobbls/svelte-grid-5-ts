<script lang="ts">
	import { type Snippet, onMount } from 'svelte';

	interface Props {
		children: Snippet;
		captureCursor?: boolean;
		blurBackground?: boolean;
		darkenBackground?: boolean;
	}

	// if captureCursor
	onMount(() => {
		function dismissModal() {
			//
		}

		if (captureCursor) {
			window.addEventListener("pointerdown", dismissModal);
		}
	});
</script>

<div id="wrapper">
	
</div>

<style>
	.wrapper {
		position: absolute;
		width: 100vh;
		height: 100vw;
	}
</style>
