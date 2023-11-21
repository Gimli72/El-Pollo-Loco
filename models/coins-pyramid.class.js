import { Coin } from './index.js';

export class CoinsPyramid {
    /** @type {Coin[]} */
    coins;

    /**
     *
     * @param {number} startAt
     */
    constructor(startAt) {
        const coinOffsets = [120, 80, 40, 80, 120];
        const coins = [];
        for (let i = 0; i < 5; i++) {
            const position_x = startAt + i * 50;
            const position_y = coinOffsets[i];
            coins.push(new Coin(position_x, position_y));
        }
        this.coins = coins;
    }
}
