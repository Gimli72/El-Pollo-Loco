class MovableObject {
  x = 50;
  y = 130;
  img;
  height = 300;
  width = 150;

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
