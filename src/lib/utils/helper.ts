import type { Item, Value, PartialItemValue, Position } from '../types/item';
import { findFreeSpaceForItem, normalize, adjust } from './item';
import { makeMatrixFromItems } from './matrix';
import { getRowsCount } from './other';

// TODO: Make most of these props derive from 'item' param.
function makeItem(item: PartialItemValue): Value {
	const { min = { w: 1, h: 1 }, max } = item;
	return {
		fixed: false,
		resizable: !item.fixed,
		draggable: !item.fixed,
		customDragger: false,
		customResizer: false,
		min: {
			w: Math.max(1, min.w),
			h: Math.max(1, min.h)
		},
		max: { ...max },
		...item
	} as Value;
}

export const gridHelp = {
	normalize(items: Item[], col: number) {
		return normalize(items, col);
	},

	adjust(items: Item[], col: number) {
		return adjust(items, col);
	},

	item(obj: PartialItemValue) {
		return makeItem(obj);
	},

	findSpace(item: Item, items: Item[], cols: number): Position {
		let matrix = makeMatrixFromItems(items, getRowsCount(items, cols), cols);

		let position = findFreeSpaceForItem(matrix, item[cols]);
		return position;
	}
};
