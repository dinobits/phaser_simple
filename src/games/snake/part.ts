import { Physics } from "phaser";

export class Part extends Physics.Arcade.Image {
    lastChangePosition?: Phaser.Math.Vector2;
    nextChangePosition?: Phaser.Math.Vector2;
    moving?:boolean
}