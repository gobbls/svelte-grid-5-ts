<script lang="ts">
/* ... */
const COL = 10; // The amount of columns for the grid at the current breakpoint.
const cols = [[1200, COL]]; // Breakpoints and columns.

/*
 * Here is a quick summary for each property.
 * Check out the "Usage" page for detailed information.
 */

// The collection of items to bind. These are dynamically updated when moved or resized.
// Think of an "item" as a "frame" or "container" for your widget's content.
let items: Item[] = $state([
	{
		id: 'move me around', // Has to be unique for each item (a UUID for example).
		data: '', // The data you want to pass to your widget.
		[COL]: {
			// 'COL' is used to match the grid column size.
			fixed: false, // Cannot be moved or resized.
			resizable: true, // If the item can be resized.
			draggable: true, // If the item can be dragged around.
			customDragger: false, // If you want to use a custom dragger, maybe an icon?
			customResizer: false, // If you want to use a custom resizer.
			min: { w: 1, h: 1 }, // The minimum size of the item.
			max: {} as Size, // The maximum size of the item.
			x: 0, // Distance from the containers left border.
			y: 0, // Distance from the containers top border.
			w: 2, // The width, in columns, of the item.
			h: 3 // The height, in rows, of the item.
		}
	}
]);
</script>
