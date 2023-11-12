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
    fallingDown = false;

    constructor() {
        super();
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y === -65) {
                    this.fallingDown = true;
                }
                if (this.fallingDown && this.y > 120) {
                    this.fallingDown = false;
                } 
            }
        }, 1000 / 25);
    }

    /**
     *
     * @returns {Boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 125;
        }
    }

    /**
     *
     * @param {MovableObject} movableObject
     * @returns {Boolean}
     */
    isColliding(movableObject) {
        return (
            this.x + this.width - this.offset.right > movableObject.x - movableObject.offset.left &&
            this.y + this.height - this.offset.bottom > movableObject.y - movableObject.offset.top &&
            this.x + this.offset.left < movableObject.x + movableObject.width - movableObject.offset.right &&
            this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
        );
    }

    hit(damage = 5) {
        // The energy must not fall below 0
        this.energy -= damage; // zurück auf 5 setzen
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     *
     * @returns {Boolean}
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     *
     * @returns {Boolean}
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed /= 1000;
        return timePassed < 1;
    }

    /**
     *
     * @param {String[]} images
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
