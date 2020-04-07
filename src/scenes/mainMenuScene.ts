import { MenuConfig } from "../interfaces/menuConfig";
import { MenuButton, MenuButtonType, MenuButtonAction } from "../interfaces/menuButton";

export class MainMenuScene extends Phaser.Scene {
    readonly menuConfigKey = 'mainMenu';
    private config: MenuConfig;

    constructor() {
        super({
            key: "MainMenuScene"
        });
        console.log('Constructing MainMenuScene');
    }

    init(data: any) {
        this.config = this.cache.json.get(this.menuConfigKey);
        console.log(this.config);
    }

    create() {
        console.log('Create MainMenuScene');

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        let centerX = width / 2;
        let centerY = height / 2;

        let prefix = this.config.prefix ?? '';

        let buttonCount = this.config.buttons.length;

        let buttonMaxHeight = height / buttonCount;
        let posY = buttonMaxHeight / 2;

        for (let i = 0; i < this.config.buttons.length; i++) {
            const button = this.config.buttons[i];
            this.createButton(button, centerX, posY);
            posY += buttonMaxHeight;
        }
    }

    private readonly style = {
        font: "bold 32px Arial",
        align: "center",
        fill: "#fff",
    };

    createButton(menuButton: MenuButton, x: integer, y: integer): Phaser.GameObjects.GameObject | undefined {
        console.log('Creating button: ', menuButton, x, y);
        let button: Phaser.GameObjects.GameObject | undefined = undefined;
        switch (menuButton.type) {
            case MenuButtonType.text:
                console.log('Creating text button');
                button = this.add.text(x, y, menuButton.text ?? 'no-text', this.style)
                    .setOrigin(0.5, 0.5)
                    .setInteractive();
                break;
            case MenuButtonType.image:
                console.log('Creating image button');
                button = this.add.image(x, y, menuButton.imageKey ?? 'no-image').setInteractive();
                break;
            default:
                return;
        }
        switch (menuButton.action) {
            case MenuButtonAction.scene:
                button.on(Phaser.Input.Events.POINTER_UP, (ev: any) => {
                    console.log('Changing scene on click: ' + menuButton.scene);
                    this.scene.start(menuButton.scene ?? 'no-scene');
                });
                break;
            case MenuButtonAction.method:
                button.on(Phaser.Input.Events.POINTER_UP, (ev: any) => {
                    let methodName: string = menuButton.method ?? 'button';
                    console.log('Method name to call is ' + methodName);
                    // this[ methodName ]();
                    // if(this.methodName) {
                    // method exists in the component
                    // this[methodName](menuButton); // call it
                    // }
                });
                break;
            case MenuButtonAction.quit:
                button.on(Phaser.Input.Events.POINTER_UP, (ev: any) => {
                    this.sys.game.destroy(true);
                });
                break;
            default:
                button.on(Phaser.Input.Events.POINTER_UP, (ev: any) => {
                    console.log('No action assigned to this button');
                });
                break;
        }
        return button;
    }

    // let playButton = this.createSceneButton('logo', 'MainScene');
    // playButton.x = width / 2;
    // playButton.y = height / 2 - 100;

    // let settingsButton = this.add.text(centerX, centerY, 'Settings').setInteractive();
    // settingsButton.on(Phaser.Input.Events.POINTER_UP, (ev: any) => {
    //     this.scene.start('BootScene');
    // });

    // let quitButton = this.add.text(centerX, centerY + 100, 'Quit').setInteractive();
    // quitButton.on(Phaser.Input.Events.POINTER_UP, (ev: any) => {
    //     // this.scene.start(sceneName);
    //     this.sys.game.destroy(true);
    // });


}