//精灵的基类，负责初始化精灵加载的资源和大小以及位置
import {DataStore} from "./DataStore.js";

export class Sprite {
    constructor(
        img = null,
        srcX = 0,
        srcY = 0,
        srcW = 0,
        srcH = 0,
        x = 0, y = 0,
        width = 0,
        height = 0
    ){
        this.dataStore = DataStore.getInstance();
        this.ctx = this.dataStore.ctx;
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    static getImage(key){
        return DataStore.getInstance().res.get(key);
    }
}