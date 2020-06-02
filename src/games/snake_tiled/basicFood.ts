import { FoodInterface } from "./interfaces/foodInterface";
import { TiledPointInterface } from "./interfaces/tiledPointInterface";
import { GameObjects } from "phaser";

export class BasicFood implements FoodInterface {
    image: Phaser.GameObjects.Image;
    location: TiledPointInterface;

    constructor(location: TiledPointInterface, imgae: GameObjects.Image) {
        this.image = imgae;
        this.location = location;
    }
}