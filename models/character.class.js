import { World, MovableObject } from "./index.js";
export class Character extends MovableObject {
    height = 300;
    width = 150;
    y = 130;

    speed = 10;

    IMAGES_WALKING = Array.from({ length: 6 }, (_, index) => {
        return `img/2_character_pepe/2_walk/W-${index + 21}.png`;
    });

    IMAGES_IDLE = Array.from({ length: 10 }, (_, index) => {
        return `img/2_character_pepe/1_idle/idle/I-${index + 1}.png`;
    });

    IMAGES_LONG_IDLE = Array.from({ length: 10 }, (_, index) => {
        return `img/2_character_pepe/1_idle/long_idle/I-${index + 11}.png`;
    });

    IMAGES_JUMPING = Array.from({ length: 9 }, (_, index) => {
        return `img/2_character_pepe/3_jump/J-${index + 31}.png`;
    });

    IMAGES_HURT = Array.from({ length: 3 }, (_, index) => {
        return `img/2_character_pepe/4_hurt/H-${index + 41}.png`;
    });

    IMAGES_DEAD = Array.from({ length: 7 }, (_, index) => {
        return `img/2_character_pepe/5_dead/D-${index + 51}.png`;
    });

    offset = {
        left: 20,
        top: 100,
        right: 20,
        bottom: 10,
    };

    /** @type {World} */
    world;

    idleCounter = 0;
    goInSleepMode = 20;

    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                }
                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                }
                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                }
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / this.fps);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.idleCounter = 0;
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.currentImage++;
                    this.idleCounter = 0;
                }
            }
        }, 60);

        setInterval(() => {
            if (this.world.keyboard.IDLE && !this.isDead()) {
                // IDLE & LONG_IDLE animation
                this.idleCounter += 1;
                this.idleCounter == 20 ? (this.currentImage = 0) : this.currentImage++;
                if (this.idleCounter > this.goInSleepMode) {
                    this.playAnimation(this.IMAGES_LONG_IDLE);
                } else {
                    this.playAnimation(this.IMAGES_IDLE);
                }
            }
        }, 200);
    }
}
