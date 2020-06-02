import { GameObjects } from "phaser";
import { TiledPointInterface } from "./tiledPointInterface";

export interface FoodInterface {
    image: GameObjects.Image;
    location: TiledPointInterface;
}