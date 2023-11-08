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

    // IMAGES_WALKING = [
    //     'img/2_character_pepe/2_walk/W-21.png',
    //     'img/2_character_pepe/2_walk/W-22.png',
    //     'img/2_character_pepe/2_walk/W-23.png',
    //     'img/2_character_pepe/2_walk/W-24.png',
    //     'img/2_character_pepe/2_walk/W-25.png',
    //     'img/2_character_pepe/2_walk/W-26.png',
    // ];

    // IMAGES_IDLE = [
    //     'img/2_character_pepe/1_idle/idle/I-1.png',
    //     'img/2_character_pepe/1_idle/idle/I-2.png',
    //     'img/2_character_pepe/1_idle/idle/I-3.png',
    //     'img/2_character_pepe/1_idle/idle/I-4.png',
    //     'img/2_character_pepe/1_idle/idle/I-5.png',
    //     'img/2_character_pepe/1_idle/idle/I-6.png',
    //     'img/2_character_pepe/1_idle/idle/I-7.png',
    //     'img/2_character_pepe/1_idle/idle/I-8.png',
    //     'img/2_character_pepe/1_idle/idle/I-9.png',
    //     'img/2_character_pepe/1_idle/idle/I-10.png',
    // ];

    // IMAGES_LONG_IDLE = [
    //     'img/2_character_pepe/1_idle/long_idle/I-11.png',
    //     'img/2_character_pepe/1_idle/long_idle/I-12.png',
    //     'img/2_character_pepe/1_idle/long_idle/I-13.png',
    //     'img/2_character_pepe/1_idle/long_idle/I-14.png',
    //     'img/2_character_pepe/1_idle/long_idle/I-15.png',
    //     'img/2_character_pepe/1_idle/long_idle/I-16.png',
    //     'img/2_character_pepe/1_idle/long_idle/I-17.png',
    //     'img/2_character_pepe/1_idle/long_idle/I-18.png',
    //     'img/2_character_pepe/1_idle/long_idle/I-19.png',
    //     'img/2_character_pepe/1_idle/long_idle/I-20.png',
    // ];

    // IMAGES_JUMPING = [
    //     'img/2_character_pepe/3_jump/J-31.png',
    //     'img/2_character_pepe/3_jump/J-32.png',
    //     'img/2_character_pepe/3_jump/J-33.png',
    //     'img/2_character_pepe/3_jump/J-34.png',
    //     'img/2_character_pepe/3_jump/J-35.png',
    //     'img/2_character_pepe/3_jump/J-36.png',
    //     'img/2_character_pepe/3_jump/J-37.png',
    //     'img/2_character_pepe/3_jump/J-38.png',
    //     'img/2_character_pepe/3_jump/J-39.png',
    // ];

    // IMAGES_HURT = [
    //     "img/2_character_pepe/4_hurt/H-41.png",
    //     "img/2_character_pepe/4_hurt/H-42.png",
    //     "img/2_character_pepe/4_hurt/H-43.png",
    // ];

    // IMAGES_DEAD = [
    //     "img/2_character_pepe/5_dead/D-51.png",
    //     "img/2_character_pepe/5_dead/D-52.png",
    //     "img/2_character_pepe/5_dead/D-53.png",
    //     "img/2_character_pepe/5_dead/D-54.png",
    //     "img/2_character_pepe/5_dead/D-55.png",
    //     "img/2_character_pepe/5_dead/D-56.png",
    //     "img/2_character_pepe/5_dead/D-57.png",
    // ];

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
