import { MovableObject, Sound } from './index.js';

export class Chicken extends MovableObject {
    height = 90;
    width = 90;
    y = 335;

    startAt = 200;

    /** @type {'normal' | 'small'} */
    size;

    offset = {
        left: 0,
        top: 5,
        right: 0,
        bottom: 5,
    };

    /** @type {string[]} */
    IMAGES_WALKING = [];

    soundChickenDead = new Sound('soundChickenDead');

    /**
     * 
     * @param {'normal' | 'small'} size 
     * @param {number} maxLength
     */
    constructor(size, maxLength = 2000) {
        super();
        this.size = size
        if (size === 'small') {
            this.height = 60;
            this.width = 60;
            this.y = 365;
        } else {
            this.height = 90;
            this.width = 90;
            this.y = 335;
        }
        this.loadImage(`img/3_enemies_chicken/chicken_${this.size}/1_walk/1_w.png`);
        this.createImagesArray();
        this.loadImages(this.IMAGES_WALKING);
        this.x = this.startAt + Math.random() * this.startAt + Math.random() * maxLength;
        this.speed = 0.15 + Math.random() * 0.2;

        this.animate();
    }

    createImagesArray() {
        this.IMAGES_WALKING = Array.from({ length: 3 }, (_, index) => {
            return `img/3_enemies_chicken/chicken_${this.size}/1_walk/${index + 1}_w.png`;
        });
    }

    animate() {
        this.intervalIds.push(
            setInterval(() => {
                this.moveLeft();
            }, 1000 / this.fps)
        );
        this.intervalIds.push(
            setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
                this.currentImage++;
            }, 240)
        );
    }

    stopAnimate() {
        this.intervalIds.forEach(clearInterval);
        this.alive ? (this.y += 10) : '';
        this.loadImage(`img/3_enemies_chicken/chicken_${this.size}/2_dead/dead.png`, this.x);
    }
}
