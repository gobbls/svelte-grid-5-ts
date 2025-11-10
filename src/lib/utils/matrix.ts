import type { Item, Value } from '../types/item';

export const makeMatrix = (rows: number, cols: number): Value[][] =>
	Array.from(Array(rows), () => new Array(cols)); // make 2d array

export function makeMatrixFromItems(
	items: Item[],
	_row: number,
	_col: number
): Value[][] {
	let matrix: Value[][] = makeMatrix(_row, _col);

	for (var i = 0; i < items.length; i++) {
		const value = items[i][_col];
		if (value) {
			const { x, y, h } = value;
			const id = items[i].id;
			const w = Math.min(_col, value.w);

			for (var j = y; j < y + h; j++) {
				const row = matrix[j];
				for (var k = x; k < x + w; k++) {
					row[k] = { ...value, id };
				}
			}
		}
	}

	return matrix;
}

export function findCloseBlocks(matrix: Value[][], curObject: Value): string[] {
	const { h, x, y } = curObject;

	const w = Math.min(matrix[0].length, curObject.w);
	const tempR = matrix.slice(y, y + h);

	let result: string[] = [];
	for (var i = 0; i < tempR.length; i++) {
		let tempA = tempR[i].slice(x, x + w);
		result = [
			...result,
			...(tempA
				.map((val) => val.id && val.id !== curObject.id && val.id)
				.filter(Boolean) as string[])
		];
	}

	return [...new Set(result)];
}

export function makeMatrixFromItemsIgnore(
	items: Item[],
	ignoreList: string[],
	_row: number,
	_col: number
): Value[][] {
	let matrix = makeMatrix(_row, _col);

	for (var i = 0; i < items.length; i++) {
		const value = items[i][_col];
		const id = items[i].id;
		const { x, y, h } = value;
		const w = Math.min(_col, value.w);

		if (ignoreList.indexOf(id) === -1) {
			for (var j = y; j < y + h; j++) {
				const row = matrix[j];
				if (row) {
					for (var k = x; k < x + w; k++) {
						row[k] = { ...value, id };
					}
				}
			}
		}
	}

	return matrix;
}

export function findItemsById(closeBlocks: string[], items: Item[]) {
	return items.filter((value) => closeBlocks.indexOf(value.id) !== -1);
}
