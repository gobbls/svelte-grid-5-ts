# svelte-grid-5-ts

![Preview of the moving and shifting action.](/static/preview.gif)

This is a fork of [svelte-grid](https://github.com/valqelyan/svelte-grid),
a project originally by [valqelyan](https://github.com/valqelyan).

## Notes

**svelte-grid-5-ts** (**SG5**); converted from Svelte 3 and JavaScript;
to [Svelte 5](https://svelte.dev/blog/svelte-5-is-alive) and
[TypeScript](https://www.typescriptlang.org/).

SG5 serves as a _mostly_ drop-in replacement for SG, meaning it's compatible
with the same configuration created by projects using SG, with few exceptions
due to the major version bump of Svelte:

1. Exposed event hooks; where SG uses
[eventDispatcher](https://svelte.dev/docs/svelte/svelte#createEventDispatcher),
SG5 uses [function props](https://svelte.dev/docs/svelte/$props).
2. Since SG5 uses TypeScript; types are publicly available in `/types/`.

## About

- 100% Svelte 5 (or TypeScript) - no jQuery, no 3rd party dependencies
- Compatible with Sapper (SSR Svelte) (**not tested in SG5**)
- Draggable widgets
- Resizable widgets
- Static widgets
- Layout can be serialized and restored
- Responsive breakpoints
- Limit the minimum and maximum width / height when resizing
- Provide helper functions
- Custom dragging
- Grid gap
- Soft autoscroll

## Installation

**via NPM**

```code
npm i svelte-grid-5-ts --save-dev
```

---

## Getting Started

> [!NOTE]
> - If you don't already have Svelte 5 installed,
> [install it](https://svelte.dev/docs/svelte/getting-started), and start a
> development server.
> - All off these steps are done in the same `.svelte` file.

1. Start by importing the component and the `Item, Size` types, as well as the
`OnChange` type, the event function we will utilize in this example -

``` HTML
<script lang="ts">
  import Grid from 'svelte-grid-5-ts';
  import type { Item, Size } from 'svelte-grid-5-ts/types/item';
  import type { OnChange } from 'svelte-grid-5-ts/types/funcs';
</script>
```

and create a `div` wrapper for SG5.

``` HTML
<div class="sg5-wrapper"></div>
```

2. Specify the specs for the grid, then create an array with a single item.

``` HTML
<script lang="ts">
  // ...
  const COL = 10;            // The amount of columns for the grid.
  const cols = [[200, COL]]; // Breakpoints and columns.

  /*
   * Here is a quick summary for each property.
   * Check out the "Usage" page for detailed information.
   */

  // The items to bind. These are dynamically altered during modification.
  // Think of an "item" as a frame for your widget.
  let items: Item[] = $state([
    {
      id: 'move me around',   // Has to be unique for each item (a UUID for example).
      data: '',               // The data you want to pass to your widget.
      [COL]: {                // 'COL' is used to match the grid column size.
      	fixed: false,         // true = not movable, but resizable.
      	resizable: true,      // true = resizable, can change dimensions.
      	draggable: true,      // true = draggable, can be moved.
      	customDragger: false, // Use a custom dragger?
      	customResizer: false, // Use a custom resizer?
      	min: { w: 1, h: 1 },  // The minimum size of this item.
      	max: {} as Size,      // The maximum size of this item.
      	x: 0,                 // Position or distance from the containers left border.
      	y: 0,                 // Position or distance from the containers top border.
      	w: 2,                 // The width, in columns, of the item.
      	h: 3                  // The height, in rows, of the item.
      }
    }
  ]);
</script>
```

We then bind the items and pass the specs to the component as props.

``` HTML
<div class="sg5-wrapper">
  <Grid
    bind:items
    {cols}
    gap={[2, 2]}      <!-- The gap in pixels between items -->
    rowHeight={50}    <!-- The height of each row in pixels -->
    fillSpace={false} <!-- Shuffle other items to tidy up the available space? -->
    fastStart         <!-- Disable the animated movement when the component mounts -->
  ></Grid>
</div>
```

3. Add the `onChange` event prop and pass it a function referance.
Provide a widget (a `div` here, for the sake of example) as a snippet for the
item to render. The children snippet returns multiple properties for us to use.
Here, we use the `dataItem` property to receive the ID of our item, to then be
used in our passed `div` to display the ID of the item.

``` HTML
<div class="sg5-wrapper">
  <Grid
    ...
    onChange={handleOnChange}
  >
    {#snippet children({ dataItem })}
      <div class="sg5-item">{dataItem.id}</div>
    {/snippet}
  </Grid>
</div>
```

Then, create the function to handle the event.

``` HTML
<script lang="ts">
  // ...
  // Let's keep track of all the updates that happens.
  let updates: number = $state(0);

  // For ease of use, simply spread the object properties.
  function handleOnChange({ ...data }: OnChange): void {
    updates++;
    console.log(
      `[UPDATE: ${updates}] Have a look at the data we can use:`,
      data
    );
  }
</script>
```

4. Then, to finish off this example, add some styling to the wrapper and your
widget.

``` HTML
<style>
  .sg5-wrapper {
    max-width: 760px;
    box-sizing: border-box;
    border: 1px solid white;
    background-color: #161618;
    margin-top: 30px;
  }

  .sg5-item {
    width: 100%;
    height: 100%;
    color: #161618;
    background-color: #a8b1ff;
    overflow: hidden;
  }
</style>
```

Now, with all the steps applied, your example should look like this.
_Open your browser console and move the item around to see the_
`OnChangefunction` _run._

![A preview of the example code above.](/static/example-preview.png)
