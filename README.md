<div align="center">
    <h1>SG5 — <em>Svelte-Grid-5-TS</em></h1>
    <p>A fork of <a href="https://github.com/valqelyan/svelte-grid">Svelte-grid</a>.</p>
    <img alt="Preview of the moving and shifting functionality" src="/static/preview.gif" />
    <a href="https://docs.alnyk.net/svelte-grid-5-ts/">Documentation</a> • <a href="https://www.npmjs.com/package/svelte-grid-5-ts">NPM</a>
</div>

## Notes

SG5 supersedes Svelte-grid by converting Svelte-grid's codebase from Svelte 3 and JavaScript, to Svelte 5 and TypeScript.

SG5 serves as a _mostly_ drop-in replacement for svelte-grid — meaning it's
compatible with the same configuration created by projects using Svelte-grid,
with few exceptions due to the major version bump of Svelte:

1. **Exposed event hooks**; where Svelte-grid uses [eventDispatcher](https://svelte.dev/docs/svelte/svelte#createEventDispatcher), SG5 uses [function props](https://svelte.dev/docs/svelte/$props).
2. **SG5 uses TypeScript**; types are publicly available in `svelte-grid-5-ts`, like everything else.

## Features

- 100% Svelte 5 & TypeScript - no jQuery, no 3rd party dependencies
- Compatible with Sapper (SSR Svelte) (not tested in SG5)
- Draggable widgets
- Resizable widgets
- Custom dragger and resizer
- Grid gap
- Static widgets
- Layout can be serialized and restored
- Responsive breakpoints
- Limit the minimum and maximum width / height when resizing
- Helper functions
- Soft autoscroll

## Installation

**via NPM**

```code
npm i svelte-grid-5-ts
```

## Getting Started

1.  Set up a project:
    1. If you don't already have Svelte 5 installed, [install it](https://svelte.dev/docs/svelte/getting-started).
    2. Install [SG5](https://www.npmjs.com/package/svelte-grid-5-ts) with `$ npm i svelte-grid-5-ts`

>
> All off these steps are done in the same `.svelte` file.
>

2.  Start by importing the main `Grid` component and the `Item, Size` types, as well as the `OnChange` type, as it will be used in this example. 

    ```Svelte
    <script lang="ts">
    import Grid from 'svelte-grid-5-ts';
    import type { Item, Size, OnChange } from 'svelte-grid-5-ts';
    </script>
    ```

3.  Create a `div` wrapper for the `Grid` component, it will be handy for listening to its size and target for styling. 

    ```HTML
    <div class="sg5-wrapper"></div>
    ```

4.  Specify the specs for the grid, then create an array with a single item.

    ```Svelte
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
    ```

5.  Place the `Grid` component in the wrapper, bind the items and pass the specs to the component as props. 

    ```Svelte
    <div class="sg5-wrapper">
        <Grid
            bind:items={items}
            cols={cols}
            gap={[2, 2]}
            rowHeight={50}
            fastStart={true}
        >
        </Grid>
    </div>
    ```

6.  Add the `onChange` event prop and pass it a function referance (we'll create the function next).
    Provide a widget — a `div` here, for the sake of example — as a snippet for the item to render.
    The `children` snippet returns multiple properties for us to use. Here, we use the dataItem
    property to receive the ID of our item to be used in our `div`. 

    ```Svelte
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
    ```

7.  Create a function to fire when the event occurs.

    ```TypeScript
    /* ... */
    let updates: number = $state(0);

    function handleOnChange({ ...data }: OnChange): void {
        updates++;
        console.log(`[UPDATE: ${updates}] Have a look at the data you can use:`, data);
    };
    /* ... */
    ```

8.  To finish off this example, add some styling to the wrapper and your widget. 

    ```HTML
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

>
> Open your browser console and move the item around to see the `OnChange` function run.
>

<div style="text-align: center;">
    <img alt="A preview of the example code above" src="/static/example-preview.png" />
</div>

---

More examples with previews available [here](https://docs.alnyk.net/svelte-grid-5-ts/examples/)
