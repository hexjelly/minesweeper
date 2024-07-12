export type BoardOptions = {
	rows?: number;
	cols?: number;
};

export class Board {
	rows: number;
	cols: number;
	state: Cell[][];

	constructor(options?: BoardOptions) {
		this.cols = options?.cols ?? 5;
		this.rows = options?.rows ?? 5;

		this.state = Array.from({ length: this.rows }).map((_row) =>
			Array.from({ length: this.cols }).map(
				(_colCell) => new Cell({ mine: Math.random() > 0.7 }),
			),
		);
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
