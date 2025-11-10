import type { Item } from '../types/item';
import { getRowsCount } from './other';

export function getContainerHeight(
	items: Item[],
	yPerPx: number,
	cols: number
): number {
	return getRowsCount(items, cols) * yPerPx;
}
