import { BackGroundObjectGroup, CoinsPyramid, Cloud, Level, Endboss, CoinsLine, Chicken, BottleGroup } from '../models/index.js';

/**
 * @description Structure of level architecture
 */
export function level1() {
    return new Level(
    [
        new BackGroundObjectGroup(-1439).background,
        new BackGroundObjectGroup(0).background,
        new BackGroundObjectGroup(1439).background
    ],
    [
        new Chicken('normal'),
        new Chicken('small'),
        new Chicken('small'),
        new Chicken('normal'),
        new Chicken('normal'),
        new Chicken('small'),
        new Chicken('normal')
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
    [
        new BottleGroup(200, 3).bottles,
        new BottleGroup(400, 2).bottles,
        new BottleGroup(1000, 4).bottles,
        new BottleGroup(1400, 2).bottles
    ],
    [
        new CoinsPyramid(300).coins,
        new CoinsLine(750).coins,
        new CoinsPyramid(1000).coins,
        new CoinsLine(1400).coins,
        new CoinsPyramid(1700).coins
    ]
);
}
