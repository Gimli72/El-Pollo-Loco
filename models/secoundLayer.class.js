import { MovableObject } from "./movable-object.class";

export class SecondLayer extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    constructor() {
        super();
        this.loadImage('./img/5_background/layers/2_second_layer/1.png');
    }
}
