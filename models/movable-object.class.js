export class MovableObject {
  x = 50;
  y = 130;
  /** @type {HTMLImageElement} */
  img;
  height = 300;
  width = 150;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;
  repeat = false // Restart cloud true or false
  fps = 60;

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
