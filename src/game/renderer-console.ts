import type { Board } from "./board";

export function renderBoardToConsole(board: Board) {
	for (const row of board.state) {
		let rowRender = "|";
		for (const cell of row) {
			if (!cell.revealed) {
				if (cell.mine) {
					rowRender += " * |";
				} else {
					rowRender += ` ${cell.neighbouringMineCount} |`;
				}
				continue;
			}

			if (cell.marked) {
				rowRender += " ? |";
				continue;
			}

			rowRender += "  |";
		}
		console.log(rowRender);
	}
}
