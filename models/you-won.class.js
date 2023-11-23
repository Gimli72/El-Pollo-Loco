import { MovableObject } from './index.js';

export class YouWon extends MovableObject {
    y = 0;
    x = 0;
    width = 720;
    height = 480;

    constructor() {
        super();
        this.loadImage('img/9_intro_outro_screens/game_over/you-won.png');
    }
}