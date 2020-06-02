export interface GameManagerInterface {
    update(time: number, delta: number): void;
    trigger(name: string):void;
}