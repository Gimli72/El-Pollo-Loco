import { MovableObject } from "./movable-object.class.js";

export class Air extends MovableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;

  constructor() {
    super();
    this.loadImage('./img/5_background/layers/air.png');
  }
}
