import { BackGroundObjectGroup, Chicken, Cloud, Level, Endboss, Bottle, Coin, ChickenSmall, BottleGroup } from '../models/index.js';

//TODO: Funktionen ausgliedern in eigene Klasse !

/**
 * @description Structure of level architecture
 */
export const level1 = new Level(
    new BackGroundObjectGroup([-1439, 0, 1439]).backgrounds,
    [
        new Chicken(),
        new ChickenSmall(),
        new ChickenSmall(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new Chicken(),
    ],
    [new Cloud(-400), new Cloud(1000), new Cloud(2000), new Cloud(3000)],
    [new Endboss()],
    new BottleGroup(12, 1300, 0).bottles,
    []
);

/**
 * 
 * @param {Number} startX 
 */
function coinsPyramid(startX) {
    const coinOffsets = [120, 80, 40, 80, 120];

    for (let i = 0; i < 5; i++) {
        const position_x = startX + i * 50;
        const position_y = coinOffsets[i];
        level1.coins.push(new Coin(position_x, position_y));
    }
}

/**
 * 
 * @param {Number} startX 
 */
function coinsInLine(startX) {

    for (let i = 0; i < 5; i++) {
        const position_x = startX;
        const position_y = 20 + (i * 45);
        level1.coins.push(new Coin(position_x, position_y));
    }
}

coinsPyramid(300);
coinsInLine(750);
coinsPyramid(1000);
coinsInLine(1400);
coinsPyramid(1700);       