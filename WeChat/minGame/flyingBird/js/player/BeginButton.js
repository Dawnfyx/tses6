//开始按钮类
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class BeginButton extends Sprite {
    constructor() {
        const image = Sprite.getImage('beginButton');

        super(
            image,
            0, 0,
            image.width, image.height,
            (DataStore.getInstance().canvas.width - image.width / 2.5) / 2,
            (DataStore.getInstance().canvas.height - image.height) / 2.5,
            image.width / 2.5, image.height / 2.5
        );

    }
}