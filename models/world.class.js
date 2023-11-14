import {
    Character,
    MovableObject,
    Keyboard,
    StatusBar,
    ThrowableObject,
    StatusBarHealth,
    StatusBarCoin,
    StatusBarBottle,
    StatusBarHealthEndboss,
    Level,
} from './index.js';

export class World {
    // level = level1;
    // endboss = this.level.endboss[0];

    keyboard;
    canvas;
    ctx;
    camera_x = 0;

    character = new Character();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarHealthEndboss = new StatusBarHealthEndboss();

    /** @type {ThrowableObject[]} */
    throwableObjects = [];

    fps = 60;

    /**
     * @param {Keyboard} keyboard
     * @param {HTMLCanvasElement} canvas
     * @param {Level} level
     */
    constructor(canvas, keyboard, level) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level;
        this.endboss = this.level.endboss[0];
        this.setWorld();
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    run() {
        setInterval(() => {
            // Check collision
            this.checkCollisions();
            this.checkCollisionsItems();
            this.fullScreenCheck();
        }, 100);
        setInterval(() => {
            this.checkThrowObjects();
        }, 250);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottle.levelStatusBar > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 80);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.levelStatusBar -= 20;
            this.character.idleCounter = 0;
            this.statusBarBottle.setPercentage(this.statusBarBottle.levelStatusBar, this.statusBarBottle.IMAGES_BOTTLE);
        }
    }

    fullScreenCheck() {
        if (this.keyboard.W && !this.isCanvasInFullscreen()) {
            this.canvas.requestFullscreen();
            this.keyboard.W = false;
        }
    }

    isCanvasInFullscreen() {
        return document.fullscreenElement === this.canvas;
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.throwableObjects.forEach((bottle, index) => {
                if (enemy.isColliding(bottle)) {
                    enemy.stopAnimate();
                    enemy.alive = false;
                }
                if (this.endboss.isColliding(bottle) && !bottle.hitEnemy) {
                    bottle.hitEnemy = true;
                    this.endboss.hit(20);
                    this.statusBarHealthEndboss.setPercentage(
                        this.endboss.energy,
                        this.statusBarHealthEndboss.IMAGES_HEALTH
                    );
                }
            });
            if (this.character.isColliding(enemy) && enemy.alive && this.character.isAboveGround() && this.character.fallingDown) {
                enemy.alive = false;
                enemy.stopAnimate();
            }
            if (this.character.isColliding(enemy) && !this.character.isDead() && enemy.alive) {
                this.character.damagedCharacter();
                this.statusBarHealth.setPercentage(this.character.energy, this.statusBarHealth.IMAGES_HEALTH);
            }
        });
        if (this.character.isColliding(this.endboss) && this.endboss.alive) {
            this.character.damagedCharacter();
            this.statusBarHealth.setPercentage(this.character.energy, this.statusBarHealth.IMAGES_HEALTH);
        }
    }

    checkCollisionsItems() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.statusBarBottle.levelStatusBar < 100) {
                this.statusBarBottle.levelStatusBar >= 100 ? '' : (this.statusBarBottle.levelStatusBar += 20);
                this.statusBarBottle.setPercentage(this.statusBarBottle.levelStatusBar, this.statusBarBottle.IMAGES_BOTTLE);
                this.level.bottles.splice(index, 1);
            }
        });
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.statusBarCoin.levelStatusBar += 4;
                this.statusBarCoin.setPercentage(this.statusBarCoin.levelStatusBar, this.statusBarCoin.IMAGES_COIN);
                this.level.coins.splice(index, 1);
            }
        });
    }

    draw() {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx?.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx?.translate(-this.camera_x, 0);
        this.addToMapStatusBar(this.statusBarHealth);
        this.addToMapStatusBar(this.statusBarCoin);
        this.addToMapStatusBar(this.statusBarBottle);
        this.character.x > 1900 || this.endboss.startEndBattle ? this.addToMapStatusBar(this.statusBarHealthEndboss) : '';

        this.ctx?.translate(this.camera_x, 0);

        this.addToMapMovableObject(this.character);

        this.ctx?.translate(-this.camera_x, 0);
        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     *
     * @param {MovableObject[]} objects
     */
    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMapMovableObject(object);
        });
    }

    /**
     *
     * @param {MovableObject} movableObject
     */
    addToMapMovableObject(movableObject) {
        if (this.ctx) {
            if (movableObject.otherDirection) {
                this.flipImage(movableObject);
            }

            movableObject.draw(this.ctx);
            movableObject.drawFrame(this.ctx);

            if (movableObject.otherDirection) {
                this.flipImageBack(movableObject);
            }
        }
    }

    /**
     *
     * @param {StatusBar} statusBar
     */
    addToMapStatusBar(statusBar) {
        if (this.ctx) {
            statusBar.draw(this.ctx);
        }
    }

    /**
     *
     * @param {MovableObject} movableObject
     */
    flipImage(movableObject) {
        if (this.ctx) {
            this.ctx.save();
            this.ctx.translate(movableObject.width, 0);
            this.ctx.scale(-1, 1);
            movableObject.x = movableObject.x * -1;
        }
    }

    /**
     *
     * @param {MovableObject} movableObject
     */
    flipImageBack(movableObject) {
        if (this.ctx) {
            movableObject.x = movableObject.x * -1;
            this.ctx.restore();
        }
    }
}
