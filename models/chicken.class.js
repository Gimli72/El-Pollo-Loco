import { MovableObject } from "./movable-object.class";

export class Chicken extends MovableObject {
  constructor() {
    super();
    this.loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
    this.y = 335;
    this.height = 90;
    this.width = 90;
  }
}
