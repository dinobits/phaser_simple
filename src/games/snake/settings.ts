import { Math, Scene } from "phaser";

export interface Settings {
    position?: Math.Vector2;
    direction?: Math.Vector2;
    size?: number;
    /**
     * Minimal distance between centers of the body parts after which Body part will stop moving
     */
    minDistance?: number;
    /**
     * Maximal distance between centers of the body parts after which Body part will start moving after previous element
     */
    maxDistance?: number;

    speed?: number;

    // image keys
    head?: string;
    body: string;
    tail?: string;

    scene: Scene;
}