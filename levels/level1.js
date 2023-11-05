import { BackGroundObject, Chicken, Cloud, Level, Endboss } from '../models/index.js';

export const level1 = new Level(
    [
        new BackGroundObject('./img/5_background/layers/air.png', -1439),
        new BackGroundObject('./img/5_background/layers/3_third_layer/full.png', -1439),
        new BackGroundObject('./img/5_background/layers/2_second_layer/full.png', -1439),
        new BackGroundObject('./img/5_background/layers/1_first_layer/full.png', -1439),
        new BackGroundObject('./img/5_background/layers/air.png'),
        new BackGroundObject('./img/5_background/layers/3_third_layer/full.png'),
        new BackGroundObject('./img/5_background/layers/2_second_layer/full.png'),
        new BackGroundObject('./img/5_background/layers/1_first_layer/full.png'),
        new BackGroundObject('./img/5_background/layers/air.png', 1439),
        new BackGroundObject('./img/5_background/layers/3_third_layer/full.png', 1439),
        new BackGroundObject('./img/5_background/layers/2_second_layer/full.png', 1439),
        new BackGroundObject('./img/5_background/layers/1_first_layer/full.png', 1439),
    ],
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
        new Endboss()
    ],
    [
        new Cloud(-400),
        new Cloud(1000),
        new Cloud(2000),
        new Cloud(3000)
    ]
);

