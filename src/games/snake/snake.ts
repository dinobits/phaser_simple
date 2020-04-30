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
    private maxDistanceSq: number;
    private minDistanceSq: number;

    private parts: Part[] = [];
    public group: Phaser.Physics.Arcade.Group;

    constructor(settings: Settings) {
        this.scene = settings.scene;

        this.bodyTexture = settings.body;
        this.headTexture = settings.head ?? settings.body;
        this.tailTexture = settings.tail ?? settings.body;

        this.direction = settings.direction ?? Phaser.Math.Vector2.ZERO;
        this.nextDirection = Phaser.Math.Vector2.ZERO;

        this.speed = settings.speed ?? 100;
        this.maxDistanceSq = settings.maxDistance ? settings.maxDistance * settings.maxDistance : 256;
        this.minDistanceSq = settings.minDistance ? settings.minDistance * settings.minDistance : 64;

        let size = settings.size ?? 3;
        let position = settings.position ?? this.scene.cameras.main.midPoint;

        this.group = this.scene.physics.add.group();

        // this.group
        // this.scene.physics.add.collider(this.group, this.group)

        this.init(size, position);
    }

    private createPart(x: number, y: number, texture: string): Part {
        let part = this.scene.physics.add.image(x, y, texture);
        this.group.add(part);
        // part.setCollideWorldBounds(true);
        
        return part;
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
    }

    getBody(): Phaser.Physics.Arcade.Group {
        return this.group;
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
            tail = this.parts.pop() ?? this.createPart(this.parts[0].x, this.parts[0].y, this.tailTexture);
        }
        for (let i = 0; i < count - 1; i++) {
            this.parts.push(this.createPart(this.parts[0].x, this.parts[0].y, this.bodyTexture));
        }
        if (tail) {
            this.parts.push(this.createPart(this.parts[0].x, this.parts[0].y, this.bodyTexture));
        } else {
            tail = this.createPart(this.parts[0].x, this.parts[0].y, this.tailTexture);
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
        for (let i = this.parts.length - 1; i > 0; i--) {
            const part = this.parts[i];
            const next = this.parts[i - 1];
            const distanceSq = next.body.position.distanceSq(part.body.position);
            const teleported = false;
            if (distanceSq > this.maxDistanceSq) {
                if (false) {
                    //here must be some check if head or any other body part teleported
                } else {
                    const direction = new Phaser.Math.Vector2(
                        next.body.x - part.body.x,
                        next.body.y - part.body.y
                    ).normalize();
                    part.setVelocity(direction.x * this.speed, direction.y * this.speed);
                }

            } else if (distanceSq < this.minDistanceSq) {
                part.setVelocity(0, 0);
            }
        }
    }
}

