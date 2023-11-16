import { MovableObject } from './index.js';

export class Bottle extends MovableObject {

    imagePaths = ['img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];

    randomImgIndex = Math.floor(Math.random() * this.imagePaths.length);

    offset = {
        left: 25,
        top: 15,
        right: 25 + this.randomImgIndex * 10,
        bottom: 10,
    };

    /**
     *
     * @param {number} start_x
     */
    constructor(start_x = 100) {
        super();
        this.x = start_x + Math.random() * 180;
        this.y = 350;
        this.width = 80;
        this.height = 80;
        this.loadImage(this.imagePaths[this.randomImgIndex], this.x);
    }
}
