/* ... */
let updates: number = $state(0);

function handleOnChange({ ...data }: OnChange): void {
	updates++;
	console.log(`[UPDATE: ${updates}] Have a look at the data you can use:`, data);
};
/* ... */
