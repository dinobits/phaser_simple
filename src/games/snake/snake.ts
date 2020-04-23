import { Action } from "./action";
import { GameObjects, Scene } from "phaser";
import { Part } from "./part";
import { Settings } from "./settings";

export class Snake {
    private scene: Scene;

    private headTexture: string;
    private bodyTexture: string;
    private tailTexture: string;

    private direction: Phaser.Math.Vector2;
    private nextDirection: Phaser.Math.Vector2; // Should not matter on greater speeds
    private speed: number;
    private distance: number;

    private parts: Part[] = [];
    private path: Phaser.Structs.List<Phaser.Math.Vector2>;

    constructor(settings: Settings) {
        this.scene = settings.scene;

        this.bodyTexture = settings.body;
        this.headTexture = settings.head ?? settings.body;
        this.tailTexture = settings.tail ?? settings.body;

        this.direction = settings.direction ?? Phaser.Math.Vector2.ZERO;
        this.nextDirection = Phaser.Math.Vector2.ZERO;

        this.speed = settings.speed ?? 100;
        this.distance = settings.distance ?? 10;

        let size = settings.size ?? 3;
        let position = settings.position ?? this.scene.cameras.main.midPoint;

        this.init(size, position);
        console.log(position);
        console.log(this.parts);
    }

    private createPart(x: number, y: number, texture: string): Part {
        return this.scene.physics.add.image(x, y, texture);
        // new Part(this.scene, position.x, position.y, this.headTexture)
    }

    private init(size: number, position: Phaser.Math.Vector2) {
        if (size > 0) {
            this.parts.push(this.createPart(position.x, position.y, this.headTexture));
        }
        for (let i = 1; i < size - 1; i++) {
            this.parts.push(this.createPart(position.x, position.y, this.bodyTexture));
        }
        if (size > 1) {
            this.parts.push(this.createPart(position.x, position.y, this.tailTexture));
        }

        this.path = new Phaser.Structs.List(Phaser.Math.Vector2);
        // let temp = new Phaser.Math.Vector2(800,200);
        // this.path.add(new Phaser.Math.Vector2(960,365));
        // this.path.add(new Phaser.Math.Vector2(100,300));
        // this.path.add(temp);
        // this.path.add(new Phaser.Math.Vector2(300,500));

        // let index = this.path.getIndex(temp);
        // let newNextPosition = this.path.getAt(index + 1);
        console.log(this.path.getAll());
        // this.path.
    }

    action(action: Action) {
        switch (action) {
            case Action.up: this.changeDirection(Phaser.Math.Vector2.UP); break;
            case Action.down: this.changeDirection(Phaser.Math.Vector2.DOWN); break;
            case Action.left: this.changeDirection(Phaser.Math.Vector2.LEFT); break;
            case Action.right: this.changeDirection(Phaser.Math.Vector2.RIGHT); break;
            default: break;
        }
        this.parts[0].setVelocity(this.direction.x * this.speed, this.direction.y * this.speed);
    }

    private changeDirection(direction: Phaser.Math.Vector2) {
        // console.log(direction);

        if (direction.x == this.nextDirection.x && direction.y == this.nextDirection.y) {
            return;
        }
        if (Math.abs(direction.x) == Math.abs(direction.y)) {
            // snake can not move diagonally
            return;
        }
        if (this.direction.x > 0 && direction.x < 0) {
            return; // can not change direction from right to left
        }
        if (this.direction.x < 0 && direction.x > 0) {
            return; // can not change direction from left to right
        }
        if (this.direction.y > 0 && direction.y < 0) {
            return; // can not change direction from down to up
        }
        if (this.direction.y < 0 && direction.y > 0) {
            return; // can not change direction from up to down
        }

        this.nextDirection = direction; // TODO: check this for not messing with old direction
        this.path.add(this.getPosition(this.parts[0]));
    }

    private getPosition(object: Phaser.Physics.Arcade.Image): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(object.x, object.y);
    }

    grow(count: number = 1): void {
        if (count < 1) {
            return;
        }
        let tail: Part | null = null;
        if (this.parts.length > 1) {
            tail = this.parts.pop() ?? new Part(this.scene, this.parts[0].x, this.parts[0].y, this.tailTexture);
        }
        for (let i = 0; i < count - 1; i++) {
            this.parts.push(new Part(this.scene, this.parts[0].x, this.parts[0].y, this.bodyTexture));
        }
        if (tail) {
            this.parts.push(new Part(this.scene, this.parts[0].x, this.parts[0].y, this.bodyTexture));
        } else {
            tail = new Part(this.scene, this.parts[0].x, this.parts[0].y, this.tailTexture);
        }
        this.parts.push(tail);
    }

    /**
     * Updates position of the snake on the screen
     */
    update() {
        this.direction = this.nextDirection;
        this.bodyUpdate();
    }

    private bodyUpdate() {
        for (let i = 1; i < this.parts.length; i++) {
            const part = this.parts[i];
            const prev = this.parts[i - 1];
            if (
                part.body.velocity.x == 0 && part.body.velocity.y == 0
                && !part.moving
            ) {
                if (this.getPosition(part).distanceSq(this.getPosition(prev)) > this.distance) {
                    part.nextChangePosition = this.path.first;
                    part.moving = true;

                    let direction = new Phaser.Math.Vector2(
                        part.nextChangePosition.x - part.x,
                        part.nextChangePosition.y - part.y
                    ).normalize();
                    part.setVelocity(direction.x * this.speed, direction.y * this.speed);
                }
            } else {
                if (part.nextChangePosition) {
                    let distance = part.nextChangePosition.distanceSq(this.getPosition(part));
                    if (distance < 4) {
                        let index = this.path.getIndex(part.nextChangePosition);
                        let newNextPosition = this.path.getAt(index + 1);
                        part.lastChangePosition = part.nextChangePosition;
                        part.nextChangePosition = newNextPosition;
                        console.log('next possition', part.nextChangePosition, newNextPosition);

                        if (part.nextChangePosition) {
                            let direction = new Phaser.Math.Vector2(
                                part.nextChangePosition.x - part.x,
                                part.nextChangePosition.y - part.y
                            ).normalize();
                            part.setVelocity(direction.x * this.speed, direction.y * this.speed);
                        }
                    }
                    // TODO: here additional chack can be added if part missed the position (went past it)
                } else {
                    if (this.path.last != part.lastChangePosition) {
                        console.log('new postioint occured');
                        part.nextChangePosition = this.path.last;

                        let direction = new Phaser.Math.Vector2(
                            part.nextChangePosition.x - part.x,
                            part.nextChangePosition.y - part.y
                        ).normalize();
                        part.setVelocity(direction.x * this.speed, direction.y * this.speed);
                    }
                }
            }
        }
    }

    /**
     * Not optimized snake body update variant, where each body element stays the same (not moving head pointer)
     */
    private bodyUpdate1() {
        for (let i = this.parts.length - 1; i > 0; i--) {
            const part = this.parts[i];
            const next = this.parts[i - 1];

            if (
                next.lastChangePosition
                && part.body.position.distance(next.lastChangePosition) < 1
                && Phaser.Math.Distance.Between(part.x, part.y, next.lastChangePosition.x, next.lastChangePosition.y) > this.distance
            ) {
                part.setVelocity(next.body.velocity.x, next.body.velocity.y);
                part.lastChangePosition = next.lastChangePosition.clone();
                // part.x = this.parts[i-1].x;
                // part.y = this.parts[i-1].y;
            }
        }
        // console.log(this.parts[0].lastChangePosition);
        // this.parts[0].setVelocity(this.direction.x * this.speed, this.direction.y * this.speed);
    }

    // private checkCollission(body:any): boolean {
    // return this.physics.overlap(body, this.food);
    // }
}

