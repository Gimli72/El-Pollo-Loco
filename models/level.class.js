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
     * @param {BackGroundObject[]} backgroundObjects
     * @param {Chicken[]} enemies
     * @param {Cloud[]} clouds
     * @param {Endboss[]} endboss
     * @param {Bottle[]} bottles
     * @param {Coin[]} coins
     */
    constructor(backgroundObjects, enemies, clouds, endboss, bottles, coins) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.clouds = clouds;
        this.endboss = endboss;
        this.bottles = bottles;
        this.coins = coins;
    }

    test() {
        console.log("Test");
    }
}