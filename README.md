# svelte-grid-5-ts, a fork of svelte-grid
This is a fork of svelte-grid, a project originally by
[valqelyan](https://github.com/valqelyan)
([svelte-grid](https://github.com/valqelyan/svelte-grid)).

## Notes
"svelte-grid-5-ts" (let's call it "SG5" from here on out) aims to do the exact
same as "svelte-grid" ("SG"), but support the better development experience (IMO)
that TypeScript sports.

There are currently no major refactoring done to the projects core functionality,
but these may be relevant to you:

- My personal formatting preferences are applied (.prettierrc).
- Events are now exposed through function props, instead of event-dispatcher.
- The types for available events and widget item are available in `/types`.

Other than that, SG5 should pretty much be a drop-in replacement for SG on
projects converting from an older Svelte codebase to Svelte 5.

## About

- 100% Svelte 5 (or TypeScript) - no jQuery, no 3rd party dependencies
- Compatible with Sapper (SSR Svelte)
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
