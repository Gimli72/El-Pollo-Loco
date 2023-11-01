let canvas;
let world;

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas);

  console.log('My Character is', world.character);
  console.log('My Enemies is', world.enemies);

}

// Im Moment für due Positionierung
window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      world.enemies[0].x -= 2;
      break;
    case "ArrowRight":
      world.enemies[0].x += 2;
      break;
    case "ArrowUp":
      world.enemies[0].y -= 2;
      break;
    case "ArrowDown":
      world.enemies[0].y += 2;
      break;
  }
  console.log("x: ", world.enemies[0].x, "// y: ", world.enemies[0].y )
});