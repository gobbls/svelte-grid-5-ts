<script lang="ts">
	import Demo from './Demo.svelte';
</script>

<h1 id="what-is-svelte-grid-5-ts">
	What is svelte-grid-5-ts?<a
		aria-label="Permalink to 'What is svelte-grid-5-ts'"
		class="header-anchor"
		href="#what-is-svelte-grid-5-ts"
	></a>
</h1>
<p>
	<strong>svelte-grid-5-ts</strong> (<strong>SG5</strong>), is a
	<a
		href="https://en.wikipedia.org/wiki/Fork_(software_development)"
		target="_blank">fork</a
	>
	of <a href="https://svelte-grid.vercel.app/" target="_blank">svelte-grid</a>
	(<strong>SG</strong>), converted from Svelte 3 and JavaScript; to
	<a href="https://svelte.dev/blog/svelte-5-is-alive" target="_blank"
		>Svelte 5</a
	>
	and <a href="https://www.typescriptlang.org/">TypeScript</a>.
</p>

<p>
	SG5 serves as a
	<i>mostly</i> drop-in replacement for SG, meaning it's compatible with the same
	configuration created by projects using SG, with few exceptions due to the major
	version bump of Svelte:
</p>

<ol>
	<li>
		<p>
			Exposed event hooks; where SG uses
			<a
				href="https://svelte.dev/docs/svelte/svelte#createEventDispatcher"
				target="_blank">eventDispatcher</a
			>, SG5 uses
			<a href="https://svelte.dev/docs/svelte/$props" target="_blank"
				>function props</a
			>.
		</p>
	</li>
	<li>
		<p>
			Since SG5 uses TypeScript; types are publicly available in <code
				>/types/</code
			>.
		</p>
	</li>
</ol>

<Demo />
