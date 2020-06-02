import { GameManagerInterface } from "../interfaces/main";
import { SnakeGame } from "../games/snake_tiled/snakeGame";

export class TestScene extends Phaser.Scene {
    escKey: Phaser.Input.Keyboard.Key;

    constructor() {
        super({
            key: "TestScene",
        });
        console.log('Constructing TestScene');
    }
    init(params: any): void { }

    preload(): void {
        console.log('Preload TestScene');
    }

    create(): void {
        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC, true, false);
        this.escKey.on(Phaser.Input.Keyboard.Events.DOWN, (ev: any) => {
            console.log('Esc key clicked down');
            this.scene.start('MainMenuScene');
        });
        this.createGame();
    }

// Write code for testing game prototypes here
    private main: GameManagerInterface | null;

    createGame():void {
        let image = this.add.image(100, 100, 'body');
        let food = this.add.image(200, 100, 'food');
    
        // this.food = this.physics.add.image(100, 200, 'food');

        this.main = new SnakeGame(food);

        let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.on(Phaser.Input.Keyboard.Events.DOWN, (ev: any) => {
            console.log('Space key clicked down');
            this.main?.trigger('spawnFood');
        });
    }

    /**
     * Should be overridden by your own Scenes.
     * This method is called once per game step while the scene is running.
     * @param time The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
     * @param delta The delta time in ms since the last frame. This is a smoothed and capped value based on the FPS rate.
     */
    update(time: number, delta: number): void {
        if (!this.main) {
            console.log('Main game class is not initialized');
            return;
        }
        this.main.update(time, delta);
    }
}