import { StatusBar } from './index.js';

export class StatusBarBottle extends StatusBar {
    IMAGES_BOTTLE = Array.from({ length: 6 }, (_, index) => {
        return `img/7_statusbars/1_statusbar/3_statusbar_bottle/green/${index * 20}.png`;
    });

    levelStatusBar = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 10;
        this.y = 100;
        this.width = 220;
        this.height = 60;
        this.setPercentage(this.levelStatusBar, this.IMAGES_BOTTLE);
    }
}
