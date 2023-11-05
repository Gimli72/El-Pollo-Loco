import { Character, MovableObject, Keyboard} from './index.js';
import { level1 } from '../levels/level1.js';

export class World {
  level = level1;
  // backgroundObjects = level1.backgroundObjects;
  // enemies = level1.enemies;
  // clouds = level1.clouds;

  character = new Character();
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

    this.addObjectsToMap(this.level.backgroundObjects);

    this.addObjectsToMap(this.level.clouds);  
    this.addObjectsToMap(this.level.enemies);

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
