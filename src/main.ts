import 'phaser';
import { MainScene } from './scenes/mainScene';
import { BootScene } from './scenes/bootScene';
import { LoadingScene } from './scenes/loadingScene';
import { MainMenuScene } from './scenes/mainMenuScene';
import { SnakeScene } from './scenes/snakeScene';
import { SnakeScene01 } from './scenes/snakeScene0.1';

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: [BootScene, LoadingScene, MainScene, MainMenuScene, SnakeScene, SnakeScene01],
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