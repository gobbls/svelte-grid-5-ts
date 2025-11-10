<script lang="ts">
	import type { Item, Size, Position } from './types/item';
	import type { OnResize, OnChange, OnMount, OnPointerUp } from './types/funcs';
	import type { Snippet } from 'svelte';
	import {
		moveItemsAroundItem,
		moveItem,
		getItemById,
		specifyUndefinedColumns
	} from './utils/item';
	import { getContainerHeight } from './utils/container';
	import { getColumn, throttle, Throttle } from './utils/other';
	import { onMount as _onMount } from 'svelte';
	import MoveResize from './MoveResize/MoveResize.svelte';

	interface Props {
		fillSpace?: boolean;
		items: Item[];
		rowHeight: number;
		cols: number[][];
		gap?: number[];
		fastStart?: boolean;
		throttleUpdate?: number;
		throttleResize?: number;
		scroller?: HTMLDivElement | undefined;
		sensor?: number;
		onResize?: ({ ...props }: OnResize) => void;
		onChange?: ({ ...props }: OnChange) => void;
		onMount?: ({ ...props }: OnMount) => void;
		onPointerUp?: ({ ...props }: OnPointerUp) => void;
		children?: Snippet<[any]>;
	}

	let {
		fillSpace = false,
		items = $bindable(),
		rowHeight,
		cols,
		gap = [10, 10],
		fastStart = false,
		throttleUpdate = 100,
		throttleResize = 100,
		scroller = undefined,
		sensor = 20,
		onResize,
		onChange,
		onMount,
		onPointerUp,
		children
	}: Props = $props();

	let getComputedCols: number = $state(cols[0][1]);
	let container = $state<HTMLDivElement>();
	let [gapX, gapY]: number[] = $derived(gap);
	let xPerPx: number = $state(0);
	let yPerPx: number = rowHeight;
	let containerWidth: number;
	let containerHeight: number = $derived(
		getContainerHeight(items, yPerPx, getComputedCols)
	);

	function _onResize(): void {
		Throttle.Throttler(({ ...args }) => {
			items = specifyUndefinedColumns(items, getComputedCols, cols);
			onResize?.({ ...args });
		}, throttleResize)({
			cols: getComputedCols,
			width: containerWidth,
			xPerPx,
			yPerPx
		});
	}

	function updateMatrix({
		id,
		shadow,
		onUpdate
	}: {
		id: string;
		shadow: Size & Position;
		onUpdate?: () => void;
	}): void {
		let activeItem = getItemById(id, items);

		if (activeItem) {
			activeItem = {
				...activeItem,
				[getComputedCols]: {
					...activeItem[getComputedCols],
					...shadow
				}
			};

			if (fillSpace) {
				items = moveItemsAroundItem(activeItem, items, getComputedCols);
			} else {
				items = moveItem(activeItem, items, getComputedCols);
			}

			onUpdate?.();

			onChange?.({
				unsafeItem: activeItem,
				id: activeItem.id,
				cols: getComputedCols
			});
		}
	}

	function handleRepaint({
		id,
		shadow,
		isPointerUp,
		onUpdate
	}: {
		id: string;
		shadow: Size & Position;
		isPointerUp?: boolean;
		onUpdate?: () => void;
	}): void {
		if (!isPointerUp) {
			throttleMatrix({ id, shadow, onUpdate });
		} else {
			updateMatrix({ id, shadow, onUpdate });
		}
	}

	const throttleMatrix = throttle(updateMatrix, throttleUpdate);

	_onMount(() => {
		const sizeObserver = new ResizeObserver((entries) => {
			requestAnimationFrame(() => {
				const width = entries[0].contentRect.width;
				if (width === containerWidth) return;

				getComputedCols = getColumn(width, cols);
				xPerPx = width / getComputedCols;

				if (!containerWidth) {
					items = specifyUndefinedColumns(items, getComputedCols, cols);
					onMount?.({
						cols: getComputedCols,
						xPerPx,
						yPerPx // same as rowHeight
					});
				} else {
					/**
					 * FIX:
					 * This accumelates in requestAnimationFrame
					 * if the (window) resizing is too fast.
					 *
					 * EXAMPLE:
					 * If "throttleUpdate" is 1000 (1 second);
					 * Resize (fast) for 5 seconds will run the function
					 * 5 times when the resizing stops.
					 */

					_onResize();
				}

				containerWidth = width;
			});
		});

		sizeObserver.observe(container!);

		return () => sizeObserver.disconnect();
	});
</script>

<div
	class="svlt-grid-container"
	style="height: {containerHeight}px"
	bind:this={container}
>
	{#if xPerPx || !fastStart}
		{#each items as item, i (item.id)}
			<MoveResize
				onRepaint={handleRepaint}
				onPointerUp={(ev) =>
					onPointerUp?.({ id: ev.id, cols: getComputedCols })}
				{gapX}
				{gapY}
				{xPerPx}
				{yPerPx}
				{sensor}
				id={item.id}
				item={item[getComputedCols]}
				resizable={item[getComputedCols] && item[getComputedCols].resizable}
				draggable={item[getComputedCols] && item[getComputedCols].draggable}
				width={Math.min(
					getComputedCols,
					item[getComputedCols] && item[getComputedCols].w
				) *
					xPerPx -
					gapX * 2}
				height={(item[getComputedCols] && item[getComputedCols].h) * yPerPx -
					gapY * 2}
				top={(item[getComputedCols] && item[getComputedCols].y) * yPerPx + gapY}
				left={(item[getComputedCols] && item[getComputedCols].x) * xPerPx +
					gapX}
				min={item[getComputedCols] && item[getComputedCols].min!}
				max={item[getComputedCols] && item[getComputedCols].max!}
				cols={getComputedCols}
				container={scroller!}
				nativeContainer={container}
			>
				{#snippet content({ resizePointerDown, movePointerDown })}
					{#if item[getComputedCols]}
						{@render children?.({
							movePointerDown,
							resizePointerDown,
							dataItem: item,
							item: item[getComputedCols],
							index: i
						})}
					{/if}
				{/snippet}
			</MoveResize>
		{/each}
	{/if}
</div>

<style>
	.svlt-grid-container {
		position: relative;
		width: 100%;
	}
</style>
