import type { Item, Size, Position } from './item';

// Publicly accessible from Grid component
export interface OnResize {
	cols: number;
	xPerPx: number;
	yPerPx: number;
	width: number;
}

export interface OnChange {
	unsafeItem: Item;
	id: string;
	cols: number;
}

export interface OnMount {
	cols: number;
	xPerPx: number;
	yPerPx: number;
}

export interface OnPointerUp {
	id: string;
	cols: number;
}

// Inaccessible
export interface OnRepaint {
	id: string;
	shadow: Size & Position;
	isPointerUp?: boolean;
	onUpdate?: () => void;
}
