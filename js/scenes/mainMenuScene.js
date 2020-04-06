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
var MainMenuScene = /** @class */ (function (_super) {
    __extends(MainMenuScene, _super);
    function MainMenuScene() {
        return _super.call(this, {
            key: "MainMenu"
        }) || this;
    }
    MainMenuScene.prototype.init = function (data) {
    };
    MainMenuScene.prototype.create = function () {
        // this.stage.backgroundColor = '#182d3b';
        // background = this.add.tileSprite(0, 0, 800, 600, 'background');
        var button = this.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
        button.onInputOver.add(over, this);
        button.onInputOut.add(out, this);
        button.onInputUp.add(up, this);
    };
    MainMenuScene.prototype.up = function () {
        console.log('button up', arguments);
    };
    MainMenuScene.prototype.over = function () {
        console.log('button over');
    };
    MainMenuScene.prototype.out = function () {
        console.log('button out');
    };
    return MainMenuScene;
}(Phaser.Scene));
exports.MainMenuScene = MainMenuScene;
//# sourceMappingURL=mainMenuScene.js.map