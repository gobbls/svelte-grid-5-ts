<script lang="ts">
	import type { Value, Size, Position } from '../types/item';
	import type { OnRepaint, OnPointerUp } from '../types/funcs';
	import type { Snippet } from 'svelte';

	type ContainerFrame = DOMRect | { top: number; bottom: number };

	interface Props {
		sensor: number;
		width: number;
		height: number;
		left: number;
		top: number;
		resizable: boolean;
		draggable: boolean;
		id: string;
		container: HTMLDivElement;
		xPerPx: number;
		yPerPx: number;
		gapX: number;
		gapY: number;
		item: Value;
		max: Size;
		min: Size;
		cols: number;
		nativeContainer: HTMLDivElement;
		onPointerUp?: ({ id }: Pick<OnPointerUp, 'id'>) => void;
		onRepaint?: ({ ...props }: OnRepaint) => void;
		content: Snippet<[any]>;
	}

	let {
		sensor,
		width,
		height,
		left,
		top,
		resizable,
		draggable,
		id,
		container,
		xPerPx,
		yPerPx,
		gapX,
		gapY,
		item,
		max,
		min,
		cols,
		nativeContainer,
		onPointerUp,
		onRepaint,
		content
	}: Props = $props();

	// For when "w" and "h" is not used, "V" for "verbose"
	interface VSize {
		width: number;
		height: number;
	}

	let shadowElement = $state<HTMLDivElement>();
	let shadow = $state<Size & Position>({ x: 0, y: 0, w: 0, h: 0 });
	let active: boolean = $state(false);
	let initX: number;
	let initY: number;
	let capturePos: Position = { x: 0, y: 0 };
	let cordDiff: Position = $state({ x: 0, y: 0 });
	let newSize: VSize = $state({ width, height });
	let trans: boolean = $state(false);
	let anima: number;

	// Autoscroll
	let _scrollTop = 0;
	let containerFrame: ContainerFrame;
	let rect = $state<DOMRect>();
	let scrollElement: HTMLElement;
	let sign: Position = { x: 0, y: 0 };
	let vel: Position = { x: 0, y: 0 };
	let intervalId: number = 0;

	// Resize
	let resizeInitPos: Position = { x: 0, y: 0 };
	let initSize: VSize = { width: 0, height: 0 };

	function getScroller(element: HTMLDivElement): HTMLElement {
		return !element ? document.documentElement : element;
	}

	function stopAutoscroll(): void {
		clearInterval(intervalId);

		intervalId = 0;
		sign = { x: 0, y: 0 };
		vel = { x: 0, y: 0 };
	}

	function repaint(cb?: () => void, isPointerUp?: boolean): void {
		onRepaint?.({
			id,
			shadow,
			isPointerUp,
			onUpdate: cb
		});
	}

	function inActivate(): void {
		const shadowBound = shadowElement!.getBoundingClientRect();
		const xdragBound = rect!.left + cordDiff.x;
		const ydragBound = rect!.top + cordDiff.y;

		cordDiff.x = shadow.x * xPerPx + gapX - (shadowBound.x - xdragBound);
		cordDiff.y = shadow.y * yPerPx + gapY - (shadowBound.y - ydragBound);
		active = false;
		trans = true;

		clearTimeout(anima);

		anima = setTimeout(() => {
			trans = false;
		}, 100);

		onPointerUp?.({ id });
	}

	function getContainerFrame(element: HTMLDivElement): ContainerFrame {
		if (element === document.documentElement || !element) {
			const { top, bottom } = nativeContainer.getBoundingClientRect();

			return {
				top: Math.max(0, top),
				bottom: Math.min(window.innerHeight, bottom)
			};
		}

		return element.getBoundingClientRect();
	}

	function update(): void {
		const _newScrollTop = scrollElement.scrollTop - _scrollTop;
		const boundX = capturePos.x + cordDiff.x;
		const boundY = capturePos.y + (cordDiff.y + _newScrollTop);
		let gridX = Math.round(boundX / xPerPx);
		let gridY = Math.round(boundY / yPerPx);

		shadow.x = Math.max(Math.min(gridX, cols - shadow.w), 0);
		shadow.y = Math.max(gridY, 0);

		repaint();
	}

	function pointermove(event: PointerEvent): void {
		event.preventDefault();
		event.stopPropagation();
		event.stopImmediatePropagation();

		const { clientX, clientY } = event;

		cordDiff = { x: clientX - initX, y: clientY - initY };

		const Y_SENSOR = sensor;
		const velocityTop = Math.max(
			0,
			(containerFrame.top + Y_SENSOR - clientY) / Y_SENSOR
		);
		const velocityBottom = Math.max(
			0,
			(clientY - (containerFrame.bottom - Y_SENSOR)) / Y_SENSOR
		);
		const topSensor = velocityTop > 0 && velocityBottom === 0;
		const bottomSensor = velocityBottom > 0 && velocityTop === 0;

		sign.y = topSensor ? -1 : bottomSensor ? 1 : 0;
		vel.y = sign.y === -1 ? velocityTop : velocityBottom;

		if (vel.y > 0) {
			if (!intervalId) {
				// NOTE: old comments by original author. -gobbls
				// Start scrolling
				// TODO Use requestAnimationFrame
				intervalId = setInterval(() => {
					scrollElement.scrollTop += 2 * (vel.y + Math.sign(vel.y)) * sign.y;
					update();
				}, 10);
			}
		} else if (intervalId) {
			stopAutoscroll();
		} else {
			update();
		}
	}

	function resizePointerMove({
		pageX,
		pageY
	}: {
		pageX: number;
		pageY: number;
	}): void {
		newSize.width = initSize.width + pageX - resizeInitPos.x;
		newSize.height = initSize.height + pageY - resizeInitPos.y;

		// Get max col number
		let maxWidth = cols - shadow.x;

		maxWidth = Math.min(max.w, maxWidth) || maxWidth;

		// Limit bound
		newSize.width = Math.max(
			Math.min(newSize.width, maxWidth * xPerPx - gapX * 2),
			min.w * xPerPx - gapX * 2
		);

		newSize.height = Math.max(newSize.height, min.h * yPerPx - gapY * 2);

		if (max.h) {
			newSize.height = Math.min(newSize.height, max.h * yPerPx - gapY * 2);
		}

		// Limit col & row
		shadow.w = Math.round((newSize.width + gapX * 2) / xPerPx);
		shadow.h = Math.round((newSize.height + gapY * 2) / yPerPx);

		repaint();
	}

	function resizePointerUp(e: any): void {
		e.stopPropagation();

		repaint(inActivate, true);

		window.removeEventListener('pointermove', resizePointerMove);
		window.removeEventListener('pointerup', resizePointerUp);
	}

	function pointerup(e: any): void {
		stopAutoscroll();

		window.removeEventListener('pointerdown', pointerdown);
		window.removeEventListener('pointermove', pointermove);
		window.removeEventListener('pointerup', pointerup);

		repaint(inActivate, true);
	}

	function resizePointerDown(e: any): void {
		e.stopPropagation();

		const { pageX, pageY } = e;

		resizeInitPos = { x: pageX, y: pageY };
		initSize = { width, height };
		cordDiff = { x: 0, y: 0 };
		rect = e.target.closest('.svlt-grid-item').getBoundingClientRect();
		newSize = { width, height };
		active = true;
		trans = false;
		shadow = { x: item.x, y: item.y, w: item.w, h: item.h };
		containerFrame = getContainerFrame(container);
		scrollElement = getScroller(container);

		window.addEventListener('pointermove', resizePointerMove);
		window.addEventListener('pointerup', resizePointerUp);
	}

	function pointerdown({
		clientX,
		clientY,
		target
	}: {
		clientX: number;
		clientY: number;
		target: unknown;
	}): void {
		const _target = target as HTMLDivElement; // infer the given type
		rect = _target.closest('.svlt-grid-item')?.getBoundingClientRect();
		initX = clientX;
		initY = clientY;

		capturePos = { x: left, y: top };
		shadow = { x: item.x, y: item.y, w: item.w, h: item.h };
		newSize = { width, height };
		containerFrame = getContainerFrame(container);
		scrollElement = getScroller(container);
		cordDiff = { x: 0, y: 0 };
		active = true;
		trans = false;
		_scrollTop = scrollElement.scrollTop;

		window.addEventListener('pointermove', pointermove);
		window.addEventListener('pointerup', pointerup);
	}

	const svltGridItemWidth = $derived(active ? newSize.width : width);
	const svltGridItemHeight = $derived(active ? newSize.height : height);
	const svltGridItemTransformTransition = $derived(
		active
			? `transform: translate(${cordDiff.x}px, ${cordDiff.y}px); top: ${rect!.top}px; left: ${rect!.left}px;`
			: trans
				? `transform: translate(${cordDiff.x}px, ${cordDiff.y}px); position: absolute; transition: width 0.2s, height 0.2s;`
				: `transition: transform 0.2s, opacity 0.2s; transform: translate(${left}px, ${top}px);`
	);
	const svltGridShadowWidth = $derived(shadow.w * xPerPx - gapX * 2);
	const svltGridShadowHeight = $derived(shadow.h * yPerPx - gapY * 2);
	const svltGridShadowTransform = $derived(
		`translate(${shadow.x * xPerPx + gapX}px, ${shadow.y * yPerPx + gapY}px)`
	);
</script>

<div
	draggable={false}
	onpointerdown={item.customDragger && !draggable ? null : pointerdown}
	class="svlt-grid-item"
	class:svlt-grid-active={active || (trans && rect)}
	style:width="{svltGridItemWidth}px"
	style:height="{svltGridItemHeight}px"
	style={svltGridItemTransformTransition}
>
	{@render content?.({ movePointerDown: pointerdown, resizePointerDown })}
	{#if resizable && !item.customResizer}
		<div class="svlt-grid-resizer" onpointerdown={resizePointerDown}></div>
	{/if}
</div>

{#if active || trans}
	<div
		class="svlt-grid-shadow shadow-active"
		style:width="{svltGridShadowWidth}px"
		style:height="{svltGridShadowHeight}px"
		style:transform={svltGridShadowTransform}
		bind:this={shadowElement}
	></div>
{/if}

<style>
	.svlt-grid-item {
		touch-action: none;
		position: absolute;
		will-change: auto;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	.svlt-grid-resizer {
		user-select: none;
		width: 20px;
		height: 20px;
		position: absolute;
		right: 0;
		bottom: 0;
		cursor: se-resize;
	}
	.svlt-grid-resizer::after {
		content: '';
		position: absolute;
		right: 3px;
		bottom: 3px;
		width: 5px;
		height: 5px;
		border-right: 2px solid rgba(0, 0, 0, 0.4);
		border-bottom: 2px solid rgba(0, 0, 0, 0.4);
	}

	.svlt-grid-active {
		z-index: 3;
		cursor: grabbing;
		position: fixed;
		opacity: 0.5;

		/*No user*/
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		-moz-backface-visibility: hidden;
		-o-backface-visibility: hidden;
		-ms-backface-visibility: hidden;
		user-select: none;
	}

	.shadow-active {
		z-index: 2;
		transition: all 0.2s;
	}

	.svlt-grid-shadow {
		position: absolute;
		background: red;
		will-change: transform;
		background: pink;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}
</style>
