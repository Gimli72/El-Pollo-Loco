import { BackGroundObjectGroup, Chicken, Cloud, Level, Endboss, Bottle, Coin, ChickenSmall, BottleGroup, CoinsPyramid, CoinsLine, CoinsGroup } from '../models/index.js';

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
        new Endboss(2350)
    ],
    new BottleGroup(7, 12, 1600).bottles,
    new CoinsGroup(300).coins,
);