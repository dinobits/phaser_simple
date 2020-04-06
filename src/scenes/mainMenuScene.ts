import { Scene } from "phaser";

export class MainMenuScene extends Phaser.Scene {
    constructor() {
        console.log('Constructing MainMenuScene');
        super({
            key: "MainMenuScene"
        });
    }

    init(data: any) {

    }

    createSceneButton(image: string, sceneName: string) {
        console.log('created scene button');
        let button = this.add.image(0, 0, image).setInteractive();
        button.on(Phaser.Input.Events.POINTER_UP, (ev: any) => {
            this.scene.start(sceneName);
        });
        return button;
    }

    createSceneText(text: string, sceneName: string) {

    }

    changeScene(sceneName: string) {
        this.scene.start(sceneName);
    }

    create() {
        console.log('Create MainMenuScene');

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        let centerX = width / 2;
        let centerY = height / 2;


        let playButton = this.createSceneButton('logo', 'MainScene');
        playButton.x = width / 2;
        playButton.y = height / 2 - 100;

        let settingsButton = this.add.text(centerX, centerY, 'Settings').setInteractive();
        settingsButton.on(Phaser.Input.Events.POINTER_UP, (ev: any) => {
            this.scene.start('BootScene');
        });

        let quitButton = this.add.text(centerX, centerY + 100, 'Quit').setInteractive();
        quitButton.on(Phaser.Input.Events.POINTER_UP, (ev: any) => {
            // this.scene.start(sceneName);
            this.sys.game.destroy(true);   
        });

        // this.scene.backgroundColor = '#182d3b';

        // background = this.add.tileSprite(0, 0, 800, 600, 'background');

        // let button = this.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);

        // button.onInputOver.add(over, this);
        // button.onInputOut.add(out, this);
        // button.onInputUp.add(up, this);
    }

    // up() {
    //     console.log('button up', arguments);
    // }

    // over() {
    //     console.log('button over');
    // }

    // out() {
    //     console.log('button out');
    // }
}