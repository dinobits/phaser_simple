import 'phaser';
import { MainScene } from './scenes/mainScene';
import { BootScene } from './scenes/bootScene';
import { LoadingScene } from './scenes/loadingScene';

const gameConfig: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,

    scene: [BootScene, LoadingScene, MainScene],
    scale: {
        width: window.innerWidth,
        height: window.innerHeight,
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 200 }
        },
    },
    backgroundColor: '#003300',
};

export const game = new Phaser.Game(gameConfig);