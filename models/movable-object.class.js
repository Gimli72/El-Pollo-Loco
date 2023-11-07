import { Character, Chicken, DrawableObject, ThrowableObject, World } from './index.js';
export class MovableObject extends DrawableObject {
    repeat = false; // Restart cloud true or false
    fps = 60;

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    constructor() {
        super();
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                // if (this.y > 125) {
                //     this.y = 125;
                // }
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 125;
        }
    }

    isColliding(movableObject) {
        return (
            this.x + this.width >= movableObject.x &&
            this.y + this.height >= movableObject.y &&
            this.x < movableObject.x &&
            this.y < movableObject.y + movableObject.height
        );
    }

    hit() {
        // The energy must not fall below 0
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed /= 1000;
        return timePassed < 1;
    }

    /**
     *
     * @param {Array} images
     */
    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}
