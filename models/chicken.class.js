class Chicken extends MovableObject {

  img = 'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png';

  constructor() {
    super().loadImage(this.img);

    this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
    this.y = 335;
    this.height = 90;
    this.width = 90;
  }
}
