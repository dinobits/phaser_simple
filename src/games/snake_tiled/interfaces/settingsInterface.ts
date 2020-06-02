import { GameObjects } from "phaser";
import { TiledPointInterface } from "./tiledPointInterface";

export interface SettingsInterface {
    maxAllowedFoodCount: number;
    foodImage: GameObjects.Image;
    maxSize: TiledPointInterface | null;
}