//初始化整个游戏的精灵，作为游戏开始的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
export class Main {
    constructor() {
        this.canvas = document.getElementById("game_canvas");
        this.ctx = this.canvas.getContext("2d");
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));

        let images = new Image();
        images.src = "../res/background.png";
        let self = this;
        images.onload = function () {
            self.ctx.drawImage(
                image,
                0,
                0,
                image.width,
                image.height,
                0,
                0,
                image.width,
                images.height
            );
        };

    }

    onResourceFirstLoaded(map){
        console.log(map);
    }
}