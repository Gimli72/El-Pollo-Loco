import { Chicken } from './index.js';

export class ChickenNormal extends Chicken {
    height = 90;
    width = 90;
    y = 335;

    /**
     *
     * @param {'normal' | 'small'} size
     */
    constructor(size) {
        super(size);
    }
}
