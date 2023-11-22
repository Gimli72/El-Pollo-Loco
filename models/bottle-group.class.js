import { Bottle } from "./index.js";

export class BottleGroup {
    /** @type {Bottle[]} */
    bottles;

    /**
     * 
     * @param {number} startAt 
     * @param {number} quantity 
     */
    constructor(startAt, quantity) {
        const bottles = [];
        // Calculate the space between the bottles
        const space = 375 / quantity;
        // Create X (quantity) new bottles with a Y (space) spacing
        for (let i = 1; i < quantity + 1; i++) {
            bottles.push(new Bottle(startAt + i * space));
        }
        this.bottles = bottles;
    }
}