import { GameObjects } from "phaser";
import { Snake } from "../games/snake/snake";
import { Settings } from "../games/snake/settings";
import { Action } from "../games/snake/action";

interface CursorKeys {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
}
interface Point {
    x: number;
    y: number;
}

export class SnakeScene01 extends Phaser.Scene {
    escKey: Phaser.Input.Keyboard.Key;
    cursors: CursorKeys;

    snake: Snake;

    constructor() {
        super({
            key: "SnakeScene01",
        });
        console.log('Constructing SnakeScene');
    }
    init(params: any): void { }

    preload(): void {
        console.log('Preload SnakeScene');
    }
    create(): void {
        console.log('Create SnakeScene');
        this.cameras.main.setBackgroundColor('black');

        let settings: Settings = {
            size: 30,
            body: 'body',
            head: 'food',

            scene: this
        };

        this.snake = new Snake(settings);

        this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC, true, false);
        this.escKey.on(Phaser.Input.Keyboard.Events.DOWN, (ev: any) => {
            console.log('Esc key clicked down');
            this.scene.start('MainMenuScene');
        });

        this.cursors = <CursorKeys>this.input.keyboard.addKeys({
            "up": Phaser.Input.Keyboard.KeyCodes.W,
            "down": Phaser.Input.Keyboard.KeyCodes.S,
            "left": Phaser.Input.Keyboard.KeyCodes.A,
            "right": Phaser.Input.Keyboard.KeyCodes.D
        });

        console.log(this.cursors);
    }

    /**
     * Should be overridden by your own Scenes.
     * This method is called once per game step while the scene is running.
     * @param time The current time. Either a High Resolution Timer value if it comes from Request Animation Frame, or Date.now if using SetTimeout.
     * @param delta The delta time in ms since the last frame. This is a smoothed and capped value based on the FPS rate.
     */
    update(time: number, delta: number): void {
        if (this.cursors.up.isDown) {
            this.snake.action(Action.up);
        }
        if (this.cursors.down.isDown) {
            this.snake.action(Action.down);
        }
        if (this.cursors.left.isDown) {
            this.snake.action(Action.left);
        }
        if (this.cursors.right.isDown) {
            this.snake.action(Action.right);
        }
        this.snake.update();
    }
}