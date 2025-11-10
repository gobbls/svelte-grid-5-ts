# svelte-grid-5-ts, a fork of svelte-grid
Originally by [valqelyan](https://github.com/valqelyan)
[svelte-grid](https://github.com/valqelyan/svelte-grid)

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

---

# Svelte library

## Developing

Install dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

Everything inside `src/lib` is part of your library, everything inside `src/routes` can be used as a showcase or preview app.

## Building

To build your library:

```sh
npm pack
```

To create a production version of your showcase app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.
