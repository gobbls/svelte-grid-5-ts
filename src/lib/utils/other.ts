import type { Item } from '../types/item';

/*
 * TODO: Set a timer here, so that the function runs once not interrupted.
 *
 * requestAnimationFrame stacks calls and executes them at once,
 * this is a better throttle in that scenario.
 */
export class Throttle {
	static lastTime: number = 0;

	static Throttler(
		func: (args?: any) => void,
		timeFrame: number
	): (args?: any) => void {
		return function({ ...args }: { args: any }) {
			const now: number = new Date().getTime();
			if (now - Throttle.lastTime >= timeFrame) {
				Throttle.lastTime = now;
				func({ ...args });
			}
		};
	}
}

export function throttle(
	func: (args?: any) => void,
	timeFrame: number
): (args?: any) => void {
	let lastTime: number = 0;
	return function(...args: any) {
		let now: number = new Date().getTime();
		if (now - lastTime >= timeFrame) {
			func(...args);
			lastTime = now;
		}
	};
}

export function getRowsCount(items: Item[], cols: number): number {
	const getItemsMaxHeight: number[] = items.map((val: Item) => {
		// The data of the variable cols property in the Item type.
		const item = val[cols];

		return (item && item.y) + (item && item.h) || 0;
	});

	return Math.max(...getItemsMaxHeight, 1);
}

export const getColumn = (
	containerWidth: number,
	columns: number[][]
): number => {
	const sortColumns = columns.slice().sort((a, b) => a[0] - b[0]);

	const breakpoint = sortColumns.find((value) => {
		const [width] = value;
		return containerWidth <= width;
	});

	if (breakpoint) {
		return breakpoint[1];
	} else {
		return sortColumns[sortColumns.length - 1][1];
	}
};
