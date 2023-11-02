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
  console.log('My Character is', world.character);
  console.log('My Enemies is', world.enemies);
  console.log('My World is', world);
  console.log('Cloud', world.clouds[0].x)

}

// 
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      keyboard.LEFT = true;
      break;
    case "ArrowRight":
      keyboard.RIGHT = true;
      break;
    case "ArrowUp":
      keyboard.UP = true;
      break;
    case "ArrowDown":
      keyboard.DOWN = true;
      break;
    case " ":
      keyboard.SPACE = true;
      break;
  }
});

//
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      keyboard.LEFT = false;
      break;
    case "ArrowRight":
      keyboard.RIGHT = false;
      break;
    case "ArrowUp":
      keyboard.UP = false;
      break;
    case "ArrowDown":
      keyboard.DOWN = false;
      break;
    case " ":
      keyboard.SPACE = false;
      break;
  }
});

