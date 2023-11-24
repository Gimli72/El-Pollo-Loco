import { MovableObject, Sound } from './index.js';

export class Coin extends MovableObject {
    
    IMAGES_COIN = Array.from({ length: 2 }, (_, index) => {
        return `img/8_coin/coin_${index + 1}.png`;
    });

    offset = {
        left: 40,
        top: 40,
        right: 40,
        bottom: 40,
    };

    soundCoins = new Sound('soundCoins');

    /**
     *
     * @param {number} start_x
     * @param {number} start_y
     */
    constructor(start_x, start_y) {
        super();
        this.loadImage('img/8_coin/coin_2.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = start_x;
        this.y = start_y;
        this.width = 120;
        this.height = 120;
        this.animate();
    }

    animate() {
        this.intervalIds.push(
            setInterval(() => {
                this.playAnimation(this.IMAGES_COIN);
                this.currentImage++;
            }, 250)
        );
    }
}
