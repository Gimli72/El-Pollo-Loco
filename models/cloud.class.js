class Cloud extends MovableObject {

    y = 20;
    width = 500;
    height = 250;
    img = 'img/5_background/layers/4_clouds/1.png';

    constructor() {
        super().loadImage(this.img);

        this.x = 200 + (Math.random() * 500); // Zahl zwischen 200 und 700

    }
}