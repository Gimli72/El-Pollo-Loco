import { BackGroundObject, Chicken, Cloud, Level } from '../models/index.js';

export const level1 = new Level(
    [
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
    new Chicken(), new Chicken(), new Chicken()
],
[
    new Cloud()
]
);

