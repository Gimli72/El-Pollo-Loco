import { Bottle } from "./index.js";

export class BottleGroup {
    /** @type {Bottle[]} */
    bottles;

    /**
     * 
     * @param {number} bottleCount 
     * @param {number} levelWidth
     * @param {number} startAt
     */
    constructor(bottleCount, levelWidth, startAt = 400) {
        const bottles = []
        // Get number of bottles (random)
        const quantity = Math.max(7, Math.round(Math.random() * bottleCount));
        // Calculate the space between the bottles
        const space = levelWidth / quantity;
        // Create X (quantity) new bottles with a Y (space) spacing
        for (let i = 1; i < quantity; i++) {
            bottles.push(new Bottle(startAt + i * space));
        }
        this.bottles = bottles
    }
}