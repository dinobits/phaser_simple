import { FoodInterface } from "./interfaces/foodInterface";
import { TiledPoint } from "./TiledPoint";
import { GameObjects } from "phaser";

export class BasicFood implements FoodInterface {
    image: Phaser.GameObjects.Image;
    location: import("./TiledPoint").TiledPoint;

    constructor(location: TiledPoint, imgae: GameObjects.Image) {
        this.image = imgae;
        this.location = location;
    }
}