export interface Group {
	title: string;
	url: string;
	open: boolean;
	items: {
		title: string;
		anchor: string;
	}[];
}
