import { StatusBar } from './index.js';

export class StatusBarHealth extends StatusBar {
    IMAGES_HEALTH = Array.from({ length: 6 }, (_, index) => {
        return `img/7_statusbars/1_statusbar/2_statusbar_health/green/${index * 20}.png`;
    });

    levelStatusBar = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 10;
        this.y = 0;
        this.width = 220;
        this.height = 60;
        this.setPercentage(this.levelStatusBar, this.IMAGES_HEALTH);
    }
}
