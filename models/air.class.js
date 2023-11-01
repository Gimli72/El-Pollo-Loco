class Air extends MovableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;
  img = './img/5_background/layers/air.png';

  constructor() {
    super().loadImage(this.img);
  }
}
