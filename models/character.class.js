import { World } from "./index.js";
import { MovableObject } from "./movable-object.class.js";
export class Character extends MovableObject {

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /** @type {World} */
    world;

    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                let index = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[index];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
         }, 240);
    }

    jump() {
        //ToDo
    }
}