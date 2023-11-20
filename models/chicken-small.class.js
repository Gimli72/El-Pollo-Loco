import { MovableObject, Sound } from './index.js';

export class ChickenSmall extends MovableObject {
    height = 60;
    width = 60;
    y = 365;

    offset = {
        left: 0,
        top: 5,
        right: 0,
        bottom: 5,
    };

    IMAGES_WALKING = Array.from({ length: 3 }, (_, index) => {
        return `img/3_enemies_chicken/chicken_small/1_walk/${index + 1}_w.png`;
    });

    soundChickenDead = new Sound('soundChickenDead');

    /**
     *
     * @param {number} start_x
     */
    constructor(start_x = 200) {
        super();
        this.loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = start_x + Math.random() * 2200; // Zahl zwischen 200 und 700
        this.speed = 0.35 + Math.random() * 0.2;

        this.animate();
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
        this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png', this.x);
    }
}
