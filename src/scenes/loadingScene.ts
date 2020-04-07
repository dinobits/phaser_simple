
export class LoadingScene extends Phaser.Scene {

    private progressBox: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;

    private loadingText: Phaser.GameObjects.Text;
    private percentText: Phaser.GameObjects.Text;
    private assetText: Phaser.GameObjects.Text;

    readonly progressBoxWidth: number = 320;
    readonly progressBoxHeight: number = 50;

    readonly progressBarWidth: number = 300;
    readonly progressBarHeight: number = 30;

    private progressBoxX: number = 0;
    private progressBoxY: number = 0;
    private progressBarX: number = 0;
    private progressBarY: number = 0;

    private nextScene: string;
    // private packURL: string;
    private packKey: string;
    // private fileList: any;

    constructor() {
        super({
            key: "LoadingScene"
        });
        console.log('Constructing LoadingScene');
    }

    init(params: any) {
        console.log('Init LoadingScene');
        console.log(params)
        if (params.scene) {
            console.log('Next scene should be ' + params.scene);
            this.nextScene = params.scene;
        }
        if (params.pack) {
            if (params.pack.url) {
                // this.packURL = params.pack.url;
            }
            if (params.pack.key) {
                this.packKey = params.pack.key;
            }
        }
    }

    preload(): void {
        console.log('Preload LoadingScene');

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();

        this.progressBoxX = (width - this.progressBoxWidth) / 2;
        this.progressBoxY = (height - this.progressBoxHeight) / 2;

        this.progressBarX = (width - this.progressBarWidth) / 2;
        this.progressBarY = (height - this.progressBarHeight) / 2;


        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(this.progressBoxX, this.progressBoxY, this.progressBoxWidth, this.progressBoxHeight);

        this.loadingText = this.add.text(
            width / 2,
            height / 2 - this.progressBoxHeight,
            'Loading...',
            {
                font: '20px monospace',
                fill: '#ffffff'
            }
        );
        this.loadingText.setOrigin(0.5, 0.5);

        this.percentText = this.add.text(
            width / 2,
            height / 2 - 0,
            '0%',
            {
                font: '18px monospace',
                fill: '#ffffff'
            }
        );
        this.percentText.setOrigin(0.5, 0.5);

        this.assetText = this.make.text({
            x: width / 2,
            y: height / 2 + this.progressBoxHeight,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        this.assetText.setOrigin(0.5, 0.5);

        if (this.packKey) {
            let url = 'config/' + this.packKey + '.json'; //FIXME: TODO: fix config global path or separate method etc.

            console.log('Pack provided!', this.packKey, url);

            this.load.pack(this.packKey, url);
        }
        // this.loadAll([]);

        this.load.on(Phaser.Loader.Events.PROGRESS, function (value: number) {
            console.log(value);
        });
        this.load.on(Phaser.Loader.Events.PROGRESS, this.updateLoader, this);

        this.load.on(Phaser.Loader.Events.FILE_PROGRESS, function (file: Phaser.Loader.File, percentComplete: number) {
            console.log(file.src);
        });
        this.load.on(Phaser.Loader.Events.FILE_PROGRESS, this.updateFileText, this);

        this.load.on(Phaser.Loader.Events.COMPLETE, function (loaderPlugin: Phaser.Loader.LoaderPlugin, totalComplete: number, totalFailed: number) {
            console.log('Total complete: ' + totalComplete);
            console.log('Total failed: ' + totalFailed);
        });
        this.load.on(Phaser.Loader.Events.COMPLETE, this.destroyLoader, this);
    }

    loadAll(data: any) {
        // this is just for loading simulation as loading 500 bojects takes time, replace it to real object list
        for (var i = 0; i < 300; i++) {
            this.load.image('logo' + i, 'assets/sprites/phaser3-logo.png');
        }
    }

    updateFileText(file: Phaser.Loader.File, percentComplete: number) {
        this.assetText.setText('Loading asset: ' + file.key);
    }

    updateLoader(value: number) {
        this.percentText.setText(value * 100 + '%');
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(
            this.progressBarX,
            this.progressBarY,
            this.progressBarWidth * value,
            this.progressBarHeight
        );
    }

    destroyLoader() {
        this.progressBar.destroy();
        this.progressBox.destroy();
        this.loadingText.destroy();
        this.percentText.destroy();
        this.assetText.destroy();
    }

    create(): void {
        console.log('Create LoadingScene');

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        const logo = this.add.image(width / 2, height / 2, 'logo');
        logo.setOrigin(0.5, 0.5);
        if (this.nextScene) {
            console.log('starting next scene ' + this.nextScene);
            this.scene.start(this.nextScene);
        }
    }
}