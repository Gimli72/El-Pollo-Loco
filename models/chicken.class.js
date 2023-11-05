import { MovableObject } from "./movable-object.class.js";

export class Chicken extends MovableObject {

  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  constructor(start_x = 200) {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);

    this.x = start_x + Math.random() * 2200; // Zahl zwischen 200 und 700
    this.y = 335;
    this.height = 90;
    this.width = 90;
    this.speed = 0.15 + Math.random() * 0.2;

    this.animate();
  }

  animate() {
    this.moveLeft();

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      this.currentImage++;
    }, 240);

  }
}