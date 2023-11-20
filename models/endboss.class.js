import { MovableObject, World } from './index.js';

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

    deadImages = 0;
    hurtImages = 0;
    attackTimer = 0;

    alive = true;
    startEndBattle = false;
    speed = 10;

    /** @type {World} */
    world;

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
                if (!this.startEndBattle) {
                    this.playAnimation(this.IMAGES_ALERTNESS);
                    this.currentImage++;
                    if (this.world.character.x >= 1900) {
                        this.startEndBattle = true;
                    }
                } else {
                    if (this.isDead()) {
                        this.playAnimation(this.IMAGES_DEAD);
                        if (!this.sounds.playAudioPlayed('soundEndbossDead')) {
                            this.sounds.playAudio('soundEndbossDead');
                            this.sounds.togglePlayback('soundEndbossDead');
                        }
                        this.currentImage++;
                        this.deadImages++;
                        if (this.deadImages === this.IMAGES_DEAD.length * 2) {
                            this.sounds.playAudio('soundEndbossDeadFloor');
                            this.stopAnimate();
                        }
                    } else if (this.isHurt()) {
                        this.playAnimation(this.IMAGES_HURT);
                        this.currentImage++;
                    } else {
                        this.playAnimation(this.IMAGES_WALKING);
                        this.currentImage++;
                        this.moveLeft();
                    }
                }
            }, 200)
        );
    }

    stopAnimate() {
        this.intervalIds.forEach(clearInterval);
        this.alive ? (this.y += 90) : '';
        this.alive = false;
        this.loadImage('img/4_enemie_boss_chicken/5_dead/G27.png', this.x);
    }
}
