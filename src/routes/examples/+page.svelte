<script lang="ts">
import { navGroups as examples } from '../../stores/examples.svelte';
</script>

<div class="wrapper">
	{#each examples as example}
		<div class="example">
			{example}
		</div>
	{/each}
</div>

<style>
</style>
