import { StatusBar } from './index.js';

export class StatusBarCoin extends StatusBar {
    IMAGES_COIN = Array.from({ length: 6 }, (_, index) => {
        return `img/7_statusbars/1_statusbar/1_statusbar_coin/green/${index * 20}.png`;
    });

    levelStatusBar = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 10;
        this.y = 50;
        this.width = 220;
        this.height = 60;
        this.setPercentage(this.levelStatusBar, this.IMAGES_COIN);
    }
}
