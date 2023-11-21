import { Chicken } from './index.js';

export class ChickenSmall extends Chicken {
    height = 60;
    width = 60;
    y = 365;

    /**
     *
     * @param {'normal' | 'small'} size
     */
    constructor(size) {
        super(size);
    }
}
