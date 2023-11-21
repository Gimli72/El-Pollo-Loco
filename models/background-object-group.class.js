import { BackGroundObject } from "./index.js"

export class BackGroundObjectGroup {
    /** @type {BackGroundObject[]} */
    backgrounds

    /**
     * 
     * @param {number[]} positions 
     */
    constructor(positions) {
        this.backgrounds = positions
            .map((x) => [
                new BackGroundObject('./img/5_background/layers/air.png', x),
                new BackGroundObject('./img/5_background/layers/3_third_layer/full.png', x),
                new BackGroundObject('./img/5_background/layers/2_second_layer/full.png', x),
                new BackGroundObject('./img/5_background/layers/1_first_layer/full.png', x),
            ])
            .flat()
    }
}