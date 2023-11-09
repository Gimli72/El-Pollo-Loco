import { BackGroundObject, Chicken, Cloud, Level, Endboss } from '../models/index.js';

export const level1 = new Level(
    [-1439, 0, 1439].map((x) => [
        new BackGroundObject('./img/5_background/layers/air.png', x),
        new BackGroundObject('./img/5_background/layers/3_third_layer/full.png', x),
        new BackGroundObject('./img/5_background/layers/2_second_layer/full.png', x),
        new BackGroundObject('./img/5_background/layers/1_first_layer/full.png', x),
    ]).flat(),
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ],
    [
        new Cloud(-400),
        new Cloud(1000),
        new Cloud(2000),
        new Cloud(3000)
    ],
    [
        new Endboss(),
    ]
);

