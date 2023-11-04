export class Level {
    backgroundObjects;
    enemies;
    clouds;

    /**
     * 
     * @param {Array} backgroundObjects 
     * @param {Array} enemies 
     * @param {Array} clouds 
     */
    constructor(backgroundObjects, enemies, clouds) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.clouds = clouds;
    }
}