import 'phaser';
import { MainScene } from './scenes/mainScene';
import { BootScene } from './scenes/bootScene';
import { LoadingScene } from './scenes/loadingScene';
import { MainMenuScene } from './scenes/mainMenuScene';
import { SnakeScene as SnakeTiledScene } from './scenes/snakeTiledScene';
import { SnakeScene01 } from './scenes/snakeScene0.1';
import { TestScene } from './scenes/testScene';

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: [BootScene, LoadingScene, MainScene, MainMenuScene, SnakeTiledScene, SnakeScene01, TestScene],
    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
    },

    physics: {
        default: 'arcade',
        // arcade: {
        //     debug: true,
        //     gravity: { y: 200 }
        // },
        arcade: {
            debug: true,
            debugShowBody: true,
            debugShowStaticBody: true,
            debugShowVelocity: true,
            debugVelocityColor: 0xffff00,
            debugBodyColor: 0x0000ff,
            debugStaticBodyColor: 0xffffff
        }
    },
    backgroundColor: '#003300',
};

export const game = new Phaser.Game(gameConfig);