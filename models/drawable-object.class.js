import { Character, Chicken, Endboss, ThrowableObject, Bottle, Coin } from './index.js';

export class DrawableObject {
    x = 50;
    y = 0;

    /** @type {HTMLImageElement} */
    img;
    /** @type {number} */
    height;
    /** @type {number} */
    width;

    /** @type {Record<string, HTMLImageElement>} */
    imageCache = {};

    /** @type {number} */
    currentImage = 0;

    offset = {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    };

    /** @type {number[]} */
    intervalIds = [];

    hitEnemy = false;

    /**
     * @param {number} x
     * @param {string} path
     */
    loadImage(path, x = 0) {
        this.img = new Image();
        this.img.src = path;
        this.x = x;
    }

    /**
     *
     * @param {string[]} imagesPaths
     */
    loadImages(imagesPaths) {
        imagesPaths.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    drawFrame(ctx) {
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof ThrowableObject ||
            this instanceof Endboss ||
            this instanceof Bottle ||
            this instanceof Coin
        ) {
            // ctx.beginPath();
            // ctx.strokeStyle = 'blue';
            // ctx.lineWidth = 2;
            // ctx.strokeRect(this.x, this.y, this.width, this.height);
            // ctx.stroke();
            
            // ctx.strokeStyle = 'red';
            // ctx.lineWidth = 2;
            // ctx.strokeRect(
            //     this.x + this.offset.right,
            //     this.y + this.offset.top,
            //     this.width - 2 * this.offset.left,
            //     this.height - (this.offset.top + this.offset.bottom)
            // );
        }
    }
}
