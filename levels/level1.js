import { BackGroundObjectGroup, Chicken, Cloud, Level, Endboss, Bottle, Coin, ChickenSmall, BottleGroup, CoinsPyramid, CoinsLine } from '../models/index.js';

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
        new Chicken()
    ],
    [
        new Cloud(-400),
        new Cloud(1000),
        new Cloud(2000),
        new Cloud(3000)
    ],
    [
        new Endboss()
    ],
    new BottleGroup(7, 12, 1300, 0).bottles,
    [
        new CoinsPyramid(300).coins,
        new CoinsLine(750).coins,
        new CoinsPyramid(1000).coins,
        new CoinsLine(1400).coins,
        new CoinsPyramid(1700).coins
    ]
);