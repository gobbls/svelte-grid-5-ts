<script lang="ts">
import { navGroups as examples } from '../../states/examples.svelte';
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
