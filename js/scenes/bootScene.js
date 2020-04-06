"use strict";
// loads main core basic logos and stuff.
// must display creators logo, maybe some starter configs
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
var BootScene = /** @class */ (function (_super) {
    __extends(BootScene, _super);
    function BootScene() {
        var _this = this;
        console.log('Constructing BootScene');
        var files = [];
        // files.push({ type: "json", key: "scenes", url: "scenes.json" });
        var sceneConfig;
        var pack = {
            key: 'scenes',
            extension: 'json'
        };
        var configFile = {
            key: 'scenes',
            type: 'json'
        };
        _this = _super.call(this, {
            key: "BootScene",
        }) || this;
        return _this;
    }
    BootScene.prototype.init = function () {
        console.log('Init BootScene');
    };
    BootScene.prototype.preload = function () {
        console.log('Preload BootScene');
        var config = this.cache.json.get('config');
        console.log(config);
        this.load.image('logo', 'images/logo.png');
        this.load.on(Phaser.Loader.Events.PROGRESS, function (value) {
            console.log(value);
        });
        this.load.on(Phaser.Loader.Events.FILE_PROGRESS, function (file, percentComplete) {
            console.log(file.src);
        });
        this.load.on(Phaser.Loader.Events.COMPLETE, function (loaderPlugin, totalComplete, totalFailed) {
            console.log('Total complete: ' + totalComplete);
            console.log('Total failed: ' + totalFailed);
        });
    };
    BootScene.prototype.create = function () {
        console.log('Create BootScene');
        var width = this.cameras.main.width / 2;
        var height = this.cameras.main.height / 2;
        var logo = this.add.image(width, height, 'logo');
        logo.setOrigin(0.5, 0.5);
        this.input.on(Phaser.Input.Events.POINTER_UP, this.nextScene, this);
    };
    BootScene.prototype.nextScene = function (pointer, currentlyOver) {
        this.scene.start('LoadingScene', {
            scene: 'MainScene'
        });
    };
    return BootScene;
}(Phaser.Scene));
exports.BootScene = BootScene;
//# sourceMappingURL=bootScene.js.map