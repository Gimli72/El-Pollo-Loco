import { World } from "../models/index.js";

/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World} */
let world;

window.addEventListener('load', init);

function init() {
  // @ts-expect-error - HTMLCanvasElement
  canvas = document.getElementById('canvas');
  world = new World(canvas);
  console.log('My Character is', world.character);
  console.log('My Enemies is', world.enemies);
  console.log('My World is', world);

}

// 
window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      world.enemies[0].x -= 1;
      break;
    case "ArrowRight":
      world.enemies[0].x += 1;
      break;
    case "ArrowUp":
      world.enemies[0].y -= 1;
      break;
    case "ArrowDown":
      world.enemies[0].y += 1;
      break;
  }
  console.log("x: ", world.enemies[0].x, "// y: ", world.enemies[0].y)
});