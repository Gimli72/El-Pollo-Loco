import { MovableObject } from './index.js';

export class ThrowableObject extends MovableObject {
    IMAGES_BOTTLE_ROTATION = Array.from({ length: 4 }, (_, index) => {
        return `img/6_salsa_bottle/bottle_rotation/${index + 1}_bottle_rotation.png`;
    });

    IMAGES_BOTTLE_SPLASH = Array.from({ length: 6 }, (_, index) => {
        return `img/6_salsa_bottle/bottle_rotation/bottle_splash/${index + 1}_bottle_splash.png`;
    });

    constructor(x, y) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 40;
        this.throw();
        this.animateBottle();
    }

    throw() {
        this.speedY = 20;

        this.applyGravity();
        this.intervalIds.push(
            setInterval(() => {
                if (this.speedY <= -45) {
                    this.stopAnimate();
                }
                this.x += 15;
            }, 40)
        );
    }

    animateBottle() {
        setInterval(() => {
            if (this.hitEnemy) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
                this.currentImage++;
            } else {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
                this.currentImage++;
            }
        }, 80);
    }

    stopAnimate() {
        this.intervalIds.forEach(clearInterval);
    }
}
