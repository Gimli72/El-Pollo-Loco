import { Bottle } from "./index.js";

export class BottleGroup {
    /** @type {Bottle[]} */
    bottles;

    /**
     * 
     * @param {number} minBottles
     * @param {number} maxBottles  
     * @param {number} levelWidth
     * @param {number} startAt
     */
    constructor(minBottles, maxBottles, levelWidth, startAt = 300) {
        const bottles = [];
        // Get number of bottles (random)
        const quantity = Math.max(minBottles, Math.round(Math.random() * maxBottles));
        // Calculate the space between the bottles
        const space = levelWidth / quantity;
        // Create X (quantity) new bottles with a Y (space) spacing
        for (let i = 1; i < quantity; i++) {
            bottles.push(new Bottle(startAt + i * space));
        }
        this.bottles = bottles;
    }
}