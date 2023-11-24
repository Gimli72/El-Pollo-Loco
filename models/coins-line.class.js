import { Coin } from './index.js';

export class CoinsLine {
    /** @type {Coin[]} */
    coins;

    /**
     * Creates five coins in vertical orientation
     * @param {number} startAt
     */
    constructor(startAt) {
        const coins = [];
        for (let i = 0; i < 5; i++) {
            const position_x = startAt;
            const position_y = 20 + i * 45;
            coins.push(new Coin(position_x, position_y));
        }
        this.coins = coins;
    }
}
