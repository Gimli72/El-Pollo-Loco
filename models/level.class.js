import { BackGroundObject, Chicken, Cloud } from "./index.js";
export class Level {
    backgroundObjects;
    enemies;
    clouds;
    level_end_x = 2240;

    /**
     *
     * @param {BackGroundObject[]} backgroundObjects
     * @param {Chicken[]} enemies
     * @param {Cloud[]} clouds
     */
    constructor(backgroundObjects, enemies, clouds) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.clouds = clouds;
    }
}