<script lang="ts">
import { onMount } from 'svelte';
import javascript from 'highlight.js/lib/languages/javascript';
import hljs from 'highlight.js/lib/core';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import WhatIsSvelteGrid5ts from './WhatIsSvelteGrid5ts.svelte';
import GettingStarted from './GettingStarted.svelte';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('xml', xml);

onMount(() => {
	hljs.highlightAll();
});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<WhatIsSvelteGrid5ts />
<hr />
<GettingStarted />

<style>
:global(.demo .svlt-grid-shadow) {
	border-radius: 5px;
}
</style>
