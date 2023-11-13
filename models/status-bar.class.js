import { DrawableObject } from './index.js';

export class StatusBar extends DrawableObject {
    

    constructor() {
        super();
    }

    /**
     * 
     * @param {number} levelStatusBar 
     * @param {string[]} images 
     */
    setPercentage(levelStatusBar, images) {
        this.levelStatusBar = levelStatusBar;
        let path = images[Math.round(levelStatusBar / 20)];
        this.img = this.imageCache[path];
    }
}

