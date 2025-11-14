import type { Item, Value, PartialItemValue, Position } from '../types/item';
import { findFreeSpaceForItem, normalize, adjust } from './item';
import { makeMatrixFromItems } from './matrix';
import { getRowsCount } from './other';

// TODO: Make most of these props derive from 'item' param.
function makeItem(item: PartialItemValue): Value {
	const {
		fixed = false,
		customDragger = false,
		customResizer = false,
		min = { w: 1, h: 1 },
		max
	}: PartialItemValue = item;

	return {
		fixed: fixed,
		resizable: !fixed,
		draggable: !fixed,
		customDragger: customDragger,
		customResizer: customResizer,
		min: {
			w: Math.max(1, min.w),
			h: Math.max(1, min.h)
		},
		max: { ...max },
		...item
	} as Value;
}

export const gridHelp = {
	normalize(items: Item[], col: number): Item[] {
		return normalize(items, col);
	},

	adjust(items: Item[], col: number): Item[] {
		return adjust(items, col);
	},

	item(obj: PartialItemValue): Value {
		return makeItem(obj);
	},

	findSpace(item: Item, items: Item[], cols: number): Position {
		let matrix = makeMatrixFromItems(items, getRowsCount(items, cols), cols);
		return findFreeSpaceForItem(matrix, item[cols]);
	}
};
