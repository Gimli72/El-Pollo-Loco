import { MovableObject } from "./movable-object.class.js";

export class Cloud extends MovableObject {
    
    height = 250;
    width = 1000;
    y = 20;

    /**
     * 
     * @param {Number} x 
     */
    constructor(x) {
        super();
        this.loadImage('img/5_background/layers/4_clouds/full.png');
        this.x = x + (Math.random() * 500); // Zahl zwischen 200 und 700
        this.repeat = true; // Restart Cloud
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

}