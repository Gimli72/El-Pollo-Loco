import { BackGroundObjectGroup, CoinsPyramid, Cloud, Level, Endboss, CoinsLine, ChickenNormal, ChickenSmall, BottleGroup } from '../models/index.js';

/**
 * @description Structure of level architecture
 */
export const level1 = new Level(
    new BackGroundObjectGroup([-1439, 0, 1439]).backgrounds,
    [
        new ChickenNormal(),
        new ChickenSmall(),
        new ChickenSmall(),
        new ChickenNormal(),
        new ChickenNormal(),
        new ChickenSmall(),
        new ChickenNormal(),
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
    new BottleGroup(7, 12, 1300, 0).bottles,
    [
        new CoinsPyramid(300).coins,
        new CoinsLine(750).coins,
        new CoinsPyramid(1000).coins,
        new CoinsLine(1400).coins,
        new CoinsPyramid(1700).coins
    ]
    // new CoinsGroup(300).coins,
);