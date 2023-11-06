import { Character, Chicken } from './index.js';

export class DrawableObject {
    x = 50;
    y = 0;

    /** @type {HTMLImageElement} */
    img;
    /** @type {Number} */
    height;
    /** @type {Number} */
    width;

    imageCache = {};
    currentImage = 0;

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
     * @param {string[]} images
     */
    loadImages(images) {
        images.forEach((path) => {
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
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}
