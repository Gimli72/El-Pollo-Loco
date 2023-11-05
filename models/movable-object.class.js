export class MovableObject {
  x = 50;
  y = 0;
  /** @type {HTMLImageElement} */
  img;
  // height = 300;
  // width = 150;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  repeat = false // Restart cloud true or false
  fps = 60;
  speedY = 0;
  acceleration = 2.5;

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
   * @param {array} array 
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    })
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
    console.log('Moving right');
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
      if (this.x < -500 && this.repeat) {
        this.x = 720;
      }
    }, 1000 / this.fps);
  }
}
