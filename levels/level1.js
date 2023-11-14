import { BackGroundObject, Chicken, Cloud, Level, Endboss, Bottle, Coin, ChickenSmall } from '../models/index.js';

//TODO: Funktionen ausgliedern in eigene Klasse !

/**
 * @description Structure of level architecture
 */
export const level1 = new Level(
    [-1439, 0, 1439]
        .map((x) => [
            new BackGroundObject('./img/5_background/layers/air.png', x),
            new BackGroundObject('./img/5_background/layers/3_third_layer/full.png', x),
            new BackGroundObject('./img/5_background/layers/2_second_layer/full.png', x),
            new BackGroundObject('./img/5_background/layers/1_first_layer/full.png', x),
        ])
        .flat(),
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
    [new Bottle(400)],
    []
);

/**
 * @description Random arrangement of bottles (7 to max. 12 pieces)
 */
function bottlePush() {
    // Get number of bottles (random)
    const quantity = Math.max(7, Math.round(Math.random() * 12));
    // Calculate the space between the bottles
    const space = 1300 / quantity;    
    // Create X (quantity) new bottles with a Y (space) spacing
    for (let i = 1; i < quantity; i++) {
        level1.bottles.push(new Bottle(400 + i * space));
    }
}

bottlePush(); 

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
        const position_y = 20 + (i*45);
        level1.coins.push(new Coin(position_x, position_y));
    }
}
   
coinsPyramid(300);  
coinsInLine(750);
coinsPyramid(1000);  
coinsInLine(1400);
coinsPyramid(1700);       