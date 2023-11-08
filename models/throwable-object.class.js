import { MovableObject } from './index.js';

export class ThrowableObject extends MovableObject {

    // IMAGES_BOTTLE_ROTATION = [
    //     'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    //     'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    //     'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    //     'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    // ];

    // IMAGES_BOTTLE_SPLASH = [
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    //     'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    // ];

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
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 40;
        this.throw();
        this.animateBottle();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {   
            this.x += 15;
        }, 40)
    }

    animateBottle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            this.currentImage++;
        }, 240);
    }
}
