import { GameObjects, Game, Tilemaps } from "phaser";
import { TiledPointInterface } from "./interfaces/tiledPointInterface";
import { BasicFood } from "./basicFood";
import { FoodInterface } from "./interfaces/foodInterface";

export interface SettingsInterface {
    maxAllowedFoodCount: number;
    foodImage: GameObjects.Image;
    maxSize: TiledPointInterface | null;
}

export class FoodManager {

    /** food array //TODO: optimize this in future to reuse DEAD food and not reinstantiating */
    private foods: FoodInterface[] = [];
    private maxAllowedFoodCount = 10;
    private foodImage: GameObjects.Image;

    private maxSize: TiledPointInterface;

    constructor(config: SettingsInterface) {
        this.maxAllowedFoodCount = config.maxAllowedFoodCount;
        this.maxSize = config.maxSize ?? <TiledPointInterface>{ x: 10, y: 10 };

        console.log('Constructing SnakeScene');
    }

    getFoodList(): FoodInterface[] {
        return this.foods;
    }

    createFood(location: TiledPointInterface, image: any = null): FoodInterface {
        let food = new BasicFood(location, image ?? this.foodImage);
        this.foods.push(food);
        return food;
    }

    /**
     * Checks if food exists by given coordinates and consumes it. Creates new food if spawnNew is set to true
     * @param x X tile coordinate of current position (usually snake head)
     * @param y Y tile coordinate of current position (usually snake head)
     * @param spawnNew Will spawn new object if current X,Y food is consumed 
     * 
     * @returns If food was consumed returns true, false otherwise
     */
    consumeFood(location: TiledPointInterface, spawnNew: boolean = true): boolean {
        let food = this.findFoodByLocation(location);
        if (!food) {
            return false;
        }
        this.removeFood(food);

        this.spawnRandomFood();

        return false;
    }

    spawnRandomFood() {
        let newLocation: TiledPointInterface = <TiledPointInterface>{
            x: Phaser.Math.Between(0, this.maxSize.x),
            y: Phaser.Math.Between(0, this.maxSize.y)
        };
        return this.createFood(newLocation);
    }

    /**
     * Remove food from manager
     * @param food food object to remove from manager
     */
    removeFood(food: FoodInterface): boolean {
        let index = this.foods.indexOf(food);
        if (index > -1) {
            this.foods.splice(index, 1);
            return true;
        }

        return false;
    }

    findFoodByLocation(location: TiledPointInterface) {
        for (let index = 0; index < this.foods.length; index++) {
            const element = this.foods[index];
            if (element.location.x == location.x
                && element.location.y == location.y) {
                return element;
            }
        }
        return null;
    }

    /**
     * Check if food exists by given tiled map coordinates
     */
    checkFood(location: TiledPointInterface): boolean {
        if (this.findFoodByLocation(location)) {
            return true;
        }
        return false;
    }
}