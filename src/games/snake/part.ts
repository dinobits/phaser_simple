import { Physics } from "phaser";

export class Part extends Physics.Arcade.Image {
    lastChangePosition?: Phaser.Math.Vector2;
}