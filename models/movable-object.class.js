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
  repeat = false // Restart cloud true or false


  /**
   * 
   * @param {string} path 
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
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

  moveRight() {
    console.log('Moving right');
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
      if (this.x < -500 && this.repeat) {
        this.x = 720;
      }
    }, 1000 / 60);
  }
}
