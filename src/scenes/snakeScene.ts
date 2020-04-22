import { GameObjects } from "phaser";

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

export class SnakeScene extends Phaser.Scene {
    escKey: Phaser.Input.Keyboard.Key;
    cursors: CursorKeys;

    direction: Point = { x: 0, y: 0 };
    nextDirection: Point = { x: 0, y: 0 };
    snakeSpeed: number = 1;

    // foods: GameObjects.Sprite[];

    // snake:Snake;
    body: Phaser.Physics.Arcade.Image[] = [];
    head: number = 0;

    food: Phaser.Physics.Arcade.Image;

    /**
     * Miliseconds between each move
     */
    gameSpeed: number = 500;
    timer: number = .0;

    constructor() {
        super({
            key: "SnakeScene",
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

        let image = this.add.image(100, 100, 'body');
        let food = this.add.image(200, 100, 'food');
    
        this.food = this.physics.add.image(100, 200, 'food');

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

        this.body.push(this.physics.add.image(100, 200, 'body'));
        this.body.push(this.physics.add.image(100, 250, 'body'));
        this.body.push(this.physics.add.image(100, 300, 'body'));

        this.snakeSpeed = image.width + image.width / 2;

        // this.snake = new Snake(body);
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
            this.changeDirection(0, -1);
        }
        if (this.cursors.down.isDown) {
            this.changeDirection(0, 1);
        }
        if (this.cursors.left.isDown) {
            this.changeDirection(-1, 0);
        }
        if (this.cursors.right.isDown) {
            this.changeDirection(1, 0);
        }

        this.timer += delta;
        if (this.timer > this.gameSpeed) {
            this.move();
            this.timer = 0;
            console.log(delta);
        }
    }

    private changeDirection(x: number, y: number): void {
        console.log(x, y);
        if (Math.abs(x) == Math.abs(y)) {
            // snake can not move diagonally
            return;
        }
        if (this.direction.x > 0 && x < 0) {
            return; // can change directio from right to left
        }
        if (this.direction.x < 0 && x > 0) {
            return; // can change directio from left to right
        }
        if (this.direction.y > 0 && y < 0) {
            return; // can change directio from down to up
        }
        if (this.direction.y < 0 && y > 0) {
            return; // can change directio from up to down
        }

        this.nextDirection.x = x * this.snakeSpeed;
        this.nextDirection.y = y * this.snakeSpeed;
    }

    private move(): void {
        // this.body.setVelocity(this.direction.x * this.snakeSpeed, this.direction.y * this.snakeSpeed);
        this.direction.x = this.nextDirection.x;
        this.direction.y = this.nextDirection.y;

        if (this.direction.x == 0 && this.direction.y == 0) {
            return;
        }

        let oldHead = this.body[this.head];
        this.head--;
        if (this.head < 0) {
            this.head = this.body.length - 1;
        }

        let newHead = this.body[this.head];

        newHead.x = oldHead.x + this.direction.x;
        newHead.y = oldHead.y + this.direction.y;

        if (this.checkCollission(newHead)) {
            this.body.push(this.physics.add.image(oldHead.x, oldHead.y, 'body'));
        }

        if (newHead.x > this.cameras.main.width) {
            newHead.x = 0;
        }
        if (newHead.x < 0) {
            newHead.x = this.cameras.main.width;
        }
        if (newHead.y > this.cameras.main.height) {
            newHead.y = 0;
        }
        if (newHead.y < 0) {
            newHead.y = this.cameras.main.height;
        }
    }

    private checkCollission(body:any): boolean {
        return this.physics.overlap(body, this.food);
    }
}