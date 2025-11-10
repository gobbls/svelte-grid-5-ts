export interface Position {
	x: number;
	y: number;
}

export interface Size {
	w: number;
	h: number;
}

export interface Value {
	id?: string; // For matrix generation
	fixed: boolean;
	resizable: boolean;
	draggable: boolean;
	customDragger: boolean;
	customResizer: boolean;
	min: Size | undefined;
	max: Size | undefined;
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface Item {
	id: string;
	data: string;
	[key: number]: Value;
}

export type PartialItemValue = Partial<Value>;
