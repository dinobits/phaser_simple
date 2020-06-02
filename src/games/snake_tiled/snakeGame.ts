import { GameManagerInterface } from "../../interfaces/main";
import { FoodManager, SettingsInterface } from "./foodManager";
import { TiledPointInterface } from "./interfaces/tiledPointInterface";
import { GameObjects } from "phaser";

export class SnakeGame implements GameManagerInterface {
    private actions = [];
    private foodManager: FoodManager;

    constructor(foodImage: GameObjects.Image) {
        this.foodManager = new FoodManager(<SettingsInterface>{
            foodImage: foodImage
        });
    }

    spawnFood() {
        console.log('Spawn food');
        let food = this.foodManager.spawnRandomFood();
        console.log(food);
    }

    eatFood() {
        let location = <TiledPointInterface>{x: 10, y:10}
        this.foodManager.consumeFood(location, true);
        this.foodManager.getFoodList();
    }

    private timer = 0;
    private gameSpeed = 0;

    /**
     * @deprecated this should not be maped like that
     */
    update(time: number, delta: number): void {
        this.timer += delta;
        if (this.timer > this.gameSpeed) {
            this.timer = 0;
        }
    }
    trigger(name: string):void {
        this.spawnFood();
    };

    getAction():any {

    }
}