import { GameObjects } from "phaser";
import { TiledPoint } from "../TiledPoint";

export interface FoodInterface {
    image: GameObjects.Image;
    location: TiledPoint;
}