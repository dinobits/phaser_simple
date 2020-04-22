import { Math, Scene } from "phaser";

export interface Settings {
    position?: Math.Vector2;
    direction?: Math.Vector2;
    size?: number;
    /**
     * Disnace between centers of the body parts
     */
    distance?: number;

    speed?: number;

    // image keys
    head?: string;
    body: string;
    tail?: string;

    scene: Scene;
}