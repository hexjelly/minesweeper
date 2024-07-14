import { Application, Container, Sprite } from "pixi.js";
import "./style.css";
import { Board } from "./game/board";
import { renderBoardToConsole } from "./game/renderer-console";
import { preload } from "./helpers";

const assets = await preload();

const board = new Board();

renderBoardToConsole(board);

const app = new Application();

await app.init({ background: "#1099bb", resizeTo: window });
document.body.appendChild(app.canvas);

const boardContainer = new Container();

app.stage.addChild(boardContainer);

for (let rowIndex = 0; rowIndex < board.state.length; rowIndex++) {
	for (let colIndex = 0; colIndex < board.state[rowIndex].length; colIndex++) {
		const sprite = Sprite.from(assets.baseCell);

		sprite.x = 16 * colIndex;
		sprite.y = 16 * rowIndex;

		sprite.eventMode = "static";
		sprite.cursor = "pointer";
		sprite.interactive = true;
		sprite.onpointertap = () => {
			const { mine, neighbouringMineCount } = board.reveal(rowIndex, colIndex);
			if (mine) {
				sprite.texture = assets.mineCell;
				for (const child of boardContainer.children) {
					child.interactive = false;
				}
			}
		};

		boardContainer.addChild(sprite);
	}
}
