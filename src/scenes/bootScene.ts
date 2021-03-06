// loads main core basic logos and stuff.
// must display creators logo, maybe some starter configs

export class BootScene extends Phaser.Scene {    
    constructor() {
        console.log('Constructing BootScene');
        let files = [];
        // files.push({ type: "json", key: "scenes", url: "scenes.json" });

        let sceneConfig: Phaser.Types.Scenes.SettingsConfig;
        let pack: Phaser.Types.Loader.FileTypes.PackFileConfig = {
            key: 'scenes',
            extension: 'json'
        };
        let configFile: Phaser.Types.Loader.FileConfig = {
            key: 'scenes',
            type: 'json'
        };
        
        super({
            key: "BootScene",
        });
    }
    
    init() {
        console.log('Init BootScene');
    }
    preload() {
        console.log('Preload BootScene');

        let config = this.cache.json.get('config');
        console.log(config);

        this.load.image('logo', 'images/logo.png');

        this.load.on(Phaser.Loader.Events.PROGRESS, function (value: number) {
            console.log(value);
        });

        this.load.on(Phaser.Loader.Events.FILE_PROGRESS, function (file: Phaser.Loader.File, percentComplete: number) {
            console.log(file.src);
        });

        this.load.on(Phaser.Loader.Events.COMPLETE, function (loaderPlugin: Phaser.Loader.LoaderPlugin, totalComplete: number, totalFailed: number) {
            console.log('Total complete: ' + totalComplete);
            console.log('Total failed: ' + totalFailed);
        });
    }

    create() {
        console.log('Create BootScene');

        const width = this.cameras.main.width / 2;
        const height = this.cameras.main.height / 2;

        const logo = this.add.image(width, height, 'logo');
        logo.setOrigin(0.5, 0.5);

        this.input.on(Phaser.Input.Events.POINTER_UP, this.nextScene, this);

        this.scene.start('LoadingScene', {
            scene: 'MainMenuScene',
            pack: {
                key: 'main'
            }
        });
    }

    nextScene(pointer: Phaser.Input.Pointer, currentlyOver: Array<Phaser.GameObjects.GameObject>) {
        this.scene.start('LoadingScene', {
            scene: 'MainMenuScene', // todo: pack and scene can have same name or close to it
            pack: {
                key: 'main'
            }
        });
    }
}