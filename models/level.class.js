import { BackGroundObject, Bottle, Chicken, Cloud, Endboss, Coin } from "./index.js";
export class Level {
    backgroundObjects;
    enemies;
    clouds;
    endboss;
    bottles;
    coins;
    level_end_x = 2240;

    /**
     *
     * @param {BackGroundObject[] | BackGroundObject[][]} backgroundObjects
     * @param {Chicken[] | Chicken[][]} enemies
     * @param {Cloud[] | Cloud[][]} clouds
     * @param {Endboss[] | Endboss[][]} endboss
     * @param {Bottle[] | Bottle[][]} bottles
     * @param {Coin[] | Coin[][]} coins
     */
    constructor(backgroundObjects, enemies, clouds, endboss, bottles, coins) {
        this.backgroundObjects = backgroundObjects.flat();
        this.enemies = enemies.flat();
        this.clouds = clouds.flat();
        this.endboss = endboss.flat();
        this.bottles = bottles.flat();
        this.coins = coins.flat();
    }
}