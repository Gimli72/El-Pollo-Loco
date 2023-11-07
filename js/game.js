import { Keyboard, World } from "../models/index.js";

/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World} */
let world;

let keyboard = new Keyboard();

window.addEventListener('load', init);

function init() {
  // @ts-expect-error - HTMLCanvasElement
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  // console.log('My Character is', world.character);
  // console.log('My Enemies is', world.enemies);
  // console.log('My World is', world);
  // console.log('Cloud', world.clouds[0].x)

}

// 
window.addEventListener("keydown", (event) => {
  switch (event.key) {
      case 'ArrowLeft':
          keyboard.LEFT = true;
          keyboard.IDLE = false;
          break;
      case 'ArrowRight':
          keyboard.RIGHT = true;
          keyboard.IDLE = false;
          break;
      case 'ArrowUp':
          keyboard.UP = true;
          keyboard.IDLE = false;
          break;
      case 'ArrowDown':
          keyboard.DOWN = true;
          keyboard.IDLE = false;
          break;
      case ' ':
          keyboard.SPACE = true;
          keyboard.IDLE = false;
          break;
      case 'd':
          keyboard.D = true;
          keyboard.IDLE = false;
          break;
  }
});

//
window.addEventListener("keyup", (event) => {
  switch (event.key) {
      case 'ArrowLeft':
          keyboard.LEFT = false;
          keyboard.IDLE = true;
          break;
      case 'ArrowRight':
          keyboard.RIGHT = false;
          keyboard.IDLE = true;
          break;
      case 'ArrowUp':
          keyboard.UP = false;
          keyboard.IDLE = true;
          break;
      case 'ArrowDown':
          keyboard.DOWN = false;
          keyboard.IDLE = true;
          break;
      case ' ':
          keyboard.SPACE = false;
          keyboard.IDLE = true;
          break;
      case 'd':
          keyboard.D = false;
          keyboard.IDLE = false;
          break;
  }
});