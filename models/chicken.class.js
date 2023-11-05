import { MovableObject } from "./index.js";

export class Chicken extends MovableObject {

  height = 90;
  width = 90;
  y = 335;

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
    this.speed = 0.15 + Math.random() * 0.2;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / this.fps);   

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
      this.currentImage++;
    }, 240);

  }
}