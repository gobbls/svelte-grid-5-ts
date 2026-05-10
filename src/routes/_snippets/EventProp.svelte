<div class="sg5-wrapper">
	<Grid
		/* ... */
		onChange={handleOnChange}
	>
		{#snippet children({ dataItem }: { dataItem: Item })}
			<div class="sg5-item">{dataItem.id}</div>
		{/snippet}
	</Grid>
</div>
