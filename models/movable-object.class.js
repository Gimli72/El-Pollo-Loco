export class MovableObject {
  x = 50;
  y = 130;
  /** @type {HTMLImageElement} */
  img;
  height = 300;
  width = 150;

  /**
   * 
   * @param {string} path 
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log('Moving right');
  }

  moveLeft() {
    console.log('Moving left');
  }
}
