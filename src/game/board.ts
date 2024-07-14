export type BoardOptions = {
	rows?: number;
	cols?: number;
};

export class Board {
	rows: number;
	cols: number;
	state: Cell[][];
	lost = false;

	constructor(options?: BoardOptions) {
		this.cols = options?.cols ?? 5;
		this.rows = options?.rows ?? 5;

		this.state = Array.from({ length: this.rows }).map((_row) =>
			Array.from({ length: this.cols }).map(
				(_colCell) => new Cell({ mine: Math.random() > 0.7 }),
			),
		);
	}

	reveal(
		row: number,
		col: number,
	): { mine: boolean; neighbouringMineCount: number; lost: boolean } {
		const cell = this.state[row][col];

		if (cell.mine) {
			this.lost = true;
		}

		return {
			lost: this.lost,
			mine: cell.mine,
			neighbouringMineCount: cell.neighbouringMineCount,
		};
	}
}

export type CellOptions = {
	mine: boolean;
};

export class Cell {
	mine = false;
	marked = false;
	neighbouringMineCount = 0;
	revealed = false;

	constructor({ mine }: CellOptions) {
		if (mine) this.mine = true;
	}

	reveal() {
		this.revealed = true;
	}

	toggleMark() {
		this.marked = !this.marked;
	}

	setNeighbouringMineCount(mines: number) {
		this.neighbouringMineCount = mines;
	}
}
