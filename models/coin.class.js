import { MovableObject } from './index.js';

export class Coin extends MovableObject {

    offset = {
        left: 40,
        top: 40,
        right: 40,
        bottom: 40,
    };

    /**
     * 
     * @param {number} start_x 
     * @param {number} start_y 
     */
    constructor(start_x, start_y) {
        super();
        this.loadImage('img/8_coin/coin_2.png');
        this.x = start_x;
        this.y = start_y;
        this.width = 120;
        this.height = 120;
    }
}
