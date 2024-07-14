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

		this.countMines();
	}

	private countMines() {
		// biome-ignore format: pls no
		const directions: [number, number][] = [
			[-1, -1], [-1, 0], [-1, 1], // top-left, top, top-right
			[0, -1],			     [0, 1], // left,        , right
			[1, -1],  [1, 0],  [1, 1], // bottom-left, bottom, bottom-right
		];

		const rows = this.rows;
		const cols = this.cols;

		for (let x = 0; x < rows; x++) {
			for (let y = 0; y < cols; y++) {
				let mineCount = 0;

				for (const [dx, dy] of directions) {
					const newX = x + dx;
					const newY = y + dy;
					if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
						const cell = this.state[newX][newY];
						if (cell.mine) {
							mineCount++;
						}
					}
				}

				this.state[x][y].setNeighbouringMineCount(mineCount);
			}
		}
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
