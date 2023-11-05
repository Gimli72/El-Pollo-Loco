import { Character, Chicken } from "./index.js";
export class MovableObject {
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
  speed = 0.15;
  otherDirection = false;
  repeat = false // Restart cloud true or false
  fps = 60;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        if (this.y > 125) {
          this.y = 125;
        }
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 125;
  }
  
  isColliding(movableObject) {
    return (this.x + this.width) >= movableObject.x &&
      (this.y + this.height) >= movableObject.y &&
      this.x < movableObject.x &&
      this.y < (movableObject.y + movableObject.height)
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
   * @param {array} images
   */
  loadImages(images) {
    images.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    })
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
    };
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
