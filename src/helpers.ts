import { Assets, type Texture } from "pixi.js";

export async function preload() {
	const assets = [
		{ alias: "baseCell", src: "base-cell.png" },
		{ alias: "mineCell", src: "mine-cell.png" },
	];
	return await Assets.load<Record<string, Texture>>(assets);
}
