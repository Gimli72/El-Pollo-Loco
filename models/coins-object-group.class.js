import { CoinsPyramid, CoinsLine, Coin } from './index.js';

export class CoinsGroup {
    /** @type {Coin[]} */
    coins;

    /**
     *
     * @param {number} startAt
     */
    constructor(startAt) {
        this.coins = [
            new CoinsPyramid(startAt).coins,
            new CoinsLine(startAt + 450).coins,
            new CoinsPyramid(startAt + 700).coins,
            new CoinsLine((startAt * 2) + (450 * 2)).coins,
            new CoinsPyramid(startAt + ( 700 * 2)).coins,
        ].flat();
    }
}
