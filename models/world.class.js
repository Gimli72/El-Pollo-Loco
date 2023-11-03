import { BackGroundObject, Character, Chicken, Cloud, MovableObject,Keyboard } from './index.js';

export class World {
  backgroundObjects = [
    new BackGroundObject('./img/5_background/layers/air.png'),
    new BackGroundObject('./img/5_background/layers/3_third_layer/full.png'),
    new BackGroundObject('./img/5_background/layers/2_second_layer/full.png'),
    new BackGroundObject('./img/5_background/layers/1_first_layer/full.png'),
    new BackGroundObject('./img/5_background/layers/air.png', 1439),
    new BackGroundObject('./img/5_background/layers/3_third_layer/full.png', 1439),
    new BackGroundObject('./img/5_background/layers/2_second_layer/full.png', 1439),
    new BackGroundObject('./img/5_background/layers/1_first_layer/full.png', 1439),
  ];
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];

  keyboard;
  canvas;
  ctx;
  camera_x = 0;

  fps = 60;

  /**
  * @param {Keyboard} keyboard
  * @param {HTMLCanvasElement} canvas 
  */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx?.translate(this.camera_x, 0);

    this.addObjectsToMap(this.backgroundObjects);

    this.addObjectsToMap(this.clouds);  
    this.addObjectsToMap(this.enemies);

    this.addToMap(this.character);

    this.ctx?.translate(-this.camera_x, 0);


    // Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      
      self.draw();
    });
  }

  /**
   * 
   * @param {MovableObject[]} objects 
   */
  addObjectsToMap(objects) {
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

  /**
 * 
 * @param {MovableObject} movableObject 
 */
  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.ctx?.save();
      this.ctx?.translate(movableObject.width, 0);
      this.ctx?.scale(-1, 1);      
      movableObject.x = movableObject.x * -1;
    }
    this.ctx?.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
    if (movableObject.otherDirection) {
      movableObject.x = movableObject.x * -1;
      this.ctx?.restore();
    }
  }
  
}
