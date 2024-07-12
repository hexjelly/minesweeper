import { Assets } from "pixi.js";

export async function preload() {
	const assets = [{ alias: "baseCell", src: "base-cell.png" }];
	await Assets.load(assets);
}
