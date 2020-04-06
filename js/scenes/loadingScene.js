"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var LoadingScene = /** @class */ (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        var _this = _super.call(this, {
            key: "LoadingScene"
        }) || this;
        _this.progressBoxWidth = 320;
        _this.progressBoxHeight = 50;
        _this.progressBarWidth = 300;
        _this.progressBarHeight = 30;
        _this.progressBoxX = 0;
        _this.progressBoxY = 0;
        _this.progressBarX = 0;
        _this.progressBarY = 0;
        console.log('Constructing LoadingScene');
        return _this;
    }
    LoadingScene.prototype.init = function (params) {
        console.log('Init LoadingScene');
        console.log(params);
        if (params.scene) {
            console.log('Next scene should be ' + params.scene);
            this.nextScene = params.scene;
        }
    };
    LoadingScene.prototype.preload = function () {
        console.log('Preload LoadingScene');
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        this.progressBar = this.add.graphics();
        this.progressBox = this.add.graphics();
        this.progressBoxX = (width - this.progressBoxWidth) / 2;
        this.progressBoxY = (height - this.progressBoxHeight) / 2;
        this.progressBarX = (width - this.progressBarWidth) / 2;
        this.progressBarY = (height - this.progressBarHeight) / 2;
        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(this.progressBoxX, this.progressBoxY, this.progressBoxWidth, this.progressBoxHeight);
        this.loadingText = this.add.text(width / 2, height / 2 - this.progressBoxHeight, 'Loading...', {
            font: '20px monospace',
            fill: '#ffffff'
        });
        this.loadingText.setOrigin(0.5, 0.5);
        this.percentText = this.add.text(width / 2, height / 2 - 0, '0%', {
            font: '18px monospace',
            fill: '#ffffff'
        });
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
        this.loadAll([]);
        this.load.on(Phaser.Loader.Events.PROGRESS, function (value) {
            console.log(value);
        });
        this.load.on(Phaser.Loader.Events.PROGRESS, this.updateLoader, this);
        this.load.on(Phaser.Loader.Events.FILE_PROGRESS, function (file, percentComplete) {
            console.log(file.src);
        });
        this.load.on(Phaser.Loader.Events.FILE_PROGRESS, this.updateFileText, this);
        this.load.on(Phaser.Loader.Events.COMPLETE, function (loaderPlugin, totalComplete, totalFailed) {
            console.log('Total complete: ' + totalComplete);
            console.log('Total failed: ' + totalFailed);
        });
        this.load.on(Phaser.Loader.Events.COMPLETE, this.destroyLoader, this);
    };
    LoadingScene.prototype.loadAll = function (data) {
        // this is just for loading simulation as loading 500 bojects takes time, replace it to real object list
        for (var i = 0; i < 300; i++) {
            this.load.image('logo' + i, 'assets/sprites/phaser3-logo.png');
        }
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    };
    LoadingScene.prototype.updateFileText = function (file, percentComplete) {
        this.assetText.setText('Loading asset: ' + file.key);
    };
    LoadingScene.prototype.updateLoader = function (value) {
        this.percentText.setText(value * 100 + '%');
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(this.progressBarX, this.progressBarY, this.progressBarWidth * value, this.progressBarHeight);
    };
    LoadingScene.prototype.destroyLoader = function () {
        this.progressBar.destroy();
        this.progressBox.destroy();
        this.loadingText.destroy();
        this.percentText.destroy();
        this.assetText.destroy();
    };
    LoadingScene.prototype.create = function () {
        console.log('Create LoadingScene');
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var logo = this.add.image(width / 2, height / 2, 'logo');
        logo.setOrigin(0.5, 0.5);
        if (this.nextScene) {
            console.log('starting next scene ' + this.nextScene);
            this.scene.start(this.nextScene);
        }
    };
    return LoadingScene;
}(Phaser.Scene));
exports.LoadingScene = LoadingScene;
//# sourceMappingURL=loadingScene.js.map