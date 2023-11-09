import { BackGroundObject, Chicken, Cloud, Endboss } from "./index.js";
export class Level {
    backgroundObjects;
    enemies;
    clouds;
    endboss;
    level_end_x = 2240;

    /**
     *
     * @param {BackGroundObject[]} backgroundObjects
     * @param {Chicken[]} enemies
     * @param {Cloud[]} clouds
     * @param {Endboss[]} endboss
     */
    constructor(backgroundObjects, enemies, clouds, endboss) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.clouds = clouds;
        this.endboss = endboss;
    }
}