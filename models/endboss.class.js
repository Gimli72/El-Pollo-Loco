import { MovableObject } from './index.js';

export class Endboss extends MovableObject {
    height = 400;
    width = 300;
    y = 55;

    offset = {
        left: 5,
        top: 75,
        right: 7,
        bottom: 13,
    };

    alive = true;

    IMAGES_WALKING = Array.from({ length: 4 }, (_, index) => {
        return `img/4_enemie_boss_chicken/1_walk/G${index + 1}.png`;
    });

    IMAGES_ALERTNESS = Array.from({ length: 8 }, (_, index) => {
        return `img/4_enemie_boss_chicken/2_alert/G${index + 5}.png`;
    });

    IMAGES_ATTACK = Array.from({ length: 8 }, (_, index) => {
        return `img/4_enemie_boss_chicken/3_attack/G${index + 13}.png`;
    });

    IMAGES_HURT = Array.from({ length: 3 }, (_, index) => {
        return `img/4_enemie_boss_chicken/4_hurt/G${index + 21}.png`;
    });

    IMAGES_DEAD = Array.from({ length: 3 }, (_, index) => {
        return `img/4_enemie_boss_chicken/5_dead/G${index + 24}.png`;
    });

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERTNESS);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2350;
        this.animate();
    }

    animate() {
        this.intervalIds.push(            
            setInterval(() => {
                if (!this.isDead()) {
                    this.playAnimation(this.IMAGES_ALERTNESS);
                    this.currentImage++;
                } else {
                    this.playAnimation(this.IMAGES_DEAD);
                    this.currentImage++;
                    if (this.currentImage === this.IMAGES_DEAD.length) {
                        this.stopAnimate();
                        this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png', this.x);
                    }
                }
            }, 400)
        );

        this.intervalIds.push(
            setInterval(() => {
                if (this.isHurt()) {
                    console.log('Endboss Hurt');
                }
            }, 60)
        );
    }

    stopAnimate() {
        this.intervalIds.forEach(clearInterval);
        this.alive ? (this.y += 10) : '';
        this.loadImage('img/4_enemie_boss_chicken/5_dead/G27.png', this.x);
    }
}
