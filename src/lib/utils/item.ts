import type { Item, Value, Position } from '../types/item';
import {
	makeMatrix,
	makeMatrixFromItemsIgnore,
	findCloseBlocks,
	findItemsById,
	makeMatrixFromItems
} from './matrix';
import { getRowsCount } from './other';

export function getItemById(id: string, items: Item[]): Item {
	return items.find((value) => value.id === id) as Item;
}

export function findFreeSpaceForItem(matrix: Value[][], item: Value): Position {
	const cols = matrix[0].length;
	const rows = matrix.length;
	const w = Math.min(cols, item.w);
	const xNtime = cols - w;

	for (var i = 0; i < rows; i++) {
		const row = matrix[i];
		for (var j = 0; j < xNtime + 1; j++) {
			const sliceA = row.slice(j, j + w);
			const empty = sliceA.every((val) => val === undefined);
			if (empty) {
				const isEmpty = matrix
					.slice(i, i + item.h)
					.every((a) => a.slice(j, j + w).every((n) => n === undefined));

				if (isEmpty) {
					return { y: i, x: j };
				}
			}
		}
	}

	return {
		y: rows,
		x: 0
	};
}

const getItem = (item: Item, col: number): Value => {
	return { ...item[col], id: item.id };
};

const updateItem = (
	elements: Item[],
	active: Item,
	position: Position,
	col: number
): Item[] => {
	return elements.map((value) => {
		if (value.id === active.id) {
			return { ...value, [col]: { ...value[col], ...position } };
		}
		return value;
	});
};

export function moveItemsAroundItem(
	active: Item,
	items: Item[],
	cols: number
): Item[] {
	// Get current item from the breakpoint
	const activeItem = getItem(active, cols);
	const ids = items
		.map((value) => value.id)
		.filter((value) => value !== activeItem.id);

	const els = items.filter((value) => value.id !== activeItem.id);

	// Update items
	let newItems = updateItem(items, active, activeItem, cols);

	let matrix = makeMatrixFromItemsIgnore(
		newItems,
		ids,
		getRowsCount(newItems, cols),
		cols
	);
	let tempItems = newItems;

	// Exclude resolved elements ids in array
	let exclude: string[] = [];

	els.forEach((item) => {
		// Find position for element
		let position = findFreeSpaceForItem(matrix, item[cols]);
		// Exclude item
		exclude.push(item.id);

		tempItems = updateItem(tempItems, item, position, cols);

		// Recreate ids of elements
		let getIgnoreItems = ids.filter((value) => exclude.indexOf(value) === -1);

		// Update matrix for next iteration
		matrix = makeMatrixFromItemsIgnore(
			tempItems,
			getIgnoreItems,
			getRowsCount(tempItems, cols),
			cols
		);
	});

	// Return result
	return tempItems;
}

export function moveItem(active: Item, items: Item[], cols: number): Item[] {
	// Get current item from the breakpoint
	const item = getItem(active, cols);

	// Create matrix from the items expect the active
	let matrix = makeMatrixFromItemsIgnore(
		items,
		[item.id as string],
		getRowsCount(items, cols),
		cols
	);
	// Getting the ids of items under active Array<String>
	const closeBlocks = findCloseBlocks(matrix, item);
	// Getting the objects of items under active Array<Object>
	let closeObj = findItemsById(closeBlocks, items);
	// Getting whenever of these items is fixed
	const fixed = closeObj.find((value) => value[cols].fixed);

	// If found fixed, reset the active to its original position
	if (fixed) return items;

	// Update items
	items = updateItem(items, active, item, cols);

	// Create matrix of items expect close elements
	matrix = makeMatrixFromItemsIgnore(
		items,
		closeBlocks,
		getRowsCount(items, cols),
		cols
	);

	// Create temp vars
	let tempItems = items;
	let tempCloseBlocks = closeBlocks;

	// Exclude resolved elements ids in array
	let exclude = [];

	// Iterate over close elements under active item
	closeObj.forEach((item) => {
		// Find position for element
		let position = findFreeSpaceForItem(matrix, item[cols]);
		// Exclude item
		exclude.push(item.id);

		// Assign the position to the element in the column
		tempItems = updateItem(tempItems, item, position, cols);

		// Recreate ids of elements
		let getIgnoreItems = tempCloseBlocks.filter(
			(value) => exclude.indexOf(value) === -1
		);

		// Update matrix for next iteration
		matrix = makeMatrixFromItemsIgnore(
			tempItems,
			getIgnoreItems,
			getRowsCount(tempItems, cols),
			cols
		);
	});

	// Return result
	return tempItems;
}

// Helper function
export function normalize(items: Item[], col: number): Item[] {
	let result = items.slice();

	result.forEach((value) => {
		const getItem = value[col];
		// BUG: 'static' does not exist, do they mean 'fixed'?
		//if (!getItem.static) {
		if (!getItem.fixed) {
			result = moveItem(value, result, col);
		}
	});

	return result;
}

// Helper function
export function adjust(items: Item[], col: number): Item[] {
	let matrix = makeMatrix(getRowsCount(items, col), col);

	const order = items.toSorted((a, b) => {
		const aItem = a[col];
		const bItem = b[col];

		return aItem.x - bItem.x || aItem.y - bItem.y;
	});

	return order.reduce((acc: Item[], item: Item) => {
		let position = findFreeSpaceForItem(matrix, item[col]);

		acc.push({
			...item,
			[col]: {
				...item[col],
				...position
			}
		});

		matrix = makeMatrixFromItems(acc, getRowsCount(acc, col), col);

		return acc;
	}, []);
}

export function getUndefinedItems(items: Item[], col: number): string[] {
	return items
		.map((value) => {
			if (!value[col]) {
				return value.id;
			}
		})
		.filter(Boolean) as string[];
}

export function getClosestColumn(
	item: Item,
	col: number,
	breakpoints: number[][]
): number {
	return breakpoints
		.map(([_, column]) => item[column] && column)
		.filter(Boolean)
		.reduce((acc, value) => {
			const isLower = Math.abs(value - col) < Math.abs(acc - col);

			return isLower ? value : acc;
		});
}

export function specifyUndefinedColumns(
	items: Item[],
	col: number,
	breakpoints: number[][]
): Item[] {
	const getUndefinedElements = getUndefinedItems(items, col);

	let matrix: Value[][] = makeMatrixFromItems(
		items,
		getRowsCount(items, col),
		col
	);
	let newItems = [...items];

	getUndefinedElements.forEach((elementId) => {
		const getElement = items.find((item) => item.id === elementId);
		const closestColumn = getClosestColumn(getElement!, col, breakpoints);
		const position = findFreeSpaceForItem(matrix, getElement![closestColumn]);
		const newItem: Item = {
			...getElement!,
			[col]: {
				...getElement![closestColumn],
				...position
			}
		};

		newItems = newItems.map((value) =>
			value.id === elementId ? newItem : value
		);
		matrix = makeMatrixFromItems(newItems, getRowsCount(newItems, col), col);
	});

	return newItems;
}
