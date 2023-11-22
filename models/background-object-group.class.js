import { BackGroundObject } from "./index.js"

export class BackGroundObjectGroup {
    /** @type {BackGroundObject[]} */
    background

    /**
     * 
     * @param {number} position
     */
    constructor(position) {
        this.background = [
            new BackGroundObject('./img/5_background/layers/air.png', position),
            new BackGroundObject('./img/5_background/layers/3_third_layer/full.png', position),
            new BackGroundObject('./img/5_background/layers/2_second_layer/full.png', position),
            new BackGroundObject('./img/5_background/layers/1_first_layer/full.png', position),
        ]
    }
}