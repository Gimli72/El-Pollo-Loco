import { MovableObject } from "./movable-object.class.js";

export class BackGroundObject extends MovableObject {
  x = 0;
  y = 0;
  width = 720;
  height = 480;

  /**
   * 
   * @param {string} imagePath 
   */
  constructor(imagePath) {
    super();
    this.loadImage(imagePath);
  }
}
