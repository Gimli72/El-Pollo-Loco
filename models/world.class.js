class World {
  backgroundObjects = [
    new BackGroundObject('./img/5_background/layers/air.png'),
    new BackGroundObject('./img/5_background/layers/3_third_layer/1.png'),
    new BackGroundObject('./img/5_background/layers/2_second_layer/1.png'),
    new BackGroundObject('./img/5_background/layers/1_first_layer/1.png'),
  ];
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);  
    this.addObjectsToMap(this.enemies);

    this.addToMap(this.character);

    // Draw() wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

  addToMap(movableObject) {
      this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);
  }
  
}
