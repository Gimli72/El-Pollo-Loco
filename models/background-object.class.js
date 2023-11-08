import { MovableObject } from "./index.js";

export class BackGroundObject extends MovableObject {
  y = 0;
  width = 1440;
  height = 480;

  /**
   * 
   * @param {string} imagePath 
   */
  constructor(imagePath, x = 0) {
    super();
    this.loadImage(imagePath);
    this.x = x;
  }
}
