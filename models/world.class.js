import { Character, MovableObject, Keyboard, StatusBar, ThrowableObject, StatusBarHealth, StatusBarCoin, StatusBarBottle, StatusBarHealthEndboss, Level, GameOver, Sound, YouWon } from './index.js';

import { gameOver, youWon } from '../js/game.js';
export class World {
    /** @type {Keyboard} */
    keyboard;
    /** @type {HTMLCanvasElement} */
    canvas;
    /** @type {number[]} */
    intervalIds = [];
    /** @type {boolean} */
    userPlays = false;

    ctx;
    camera_x = 0;
    fps = 60;

    character = new Character();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarHealthEndboss = new StatusBarHealthEndboss();

    outroScreenGameOver = new GameOver();
    outroScreenLost = new YouWon();

    /** @type {ThrowableObject[]} */
    bottles = [];

    // Sounds
    soundBackgroundMusic = new Sound('soundBackgroundMusic', true);
    soundGameOver = new Sound('soundGameOver');

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
        this.soundBackgroundMusic.play();
        this.intervalIds.push(
            setInterval(() => {
                // Check collision
                this.checkCollisions();
                this.checkCollisionsItems();
                this.fullScreenCheck();
            }, 100)
        );
        this.intervalIds.push(
            setInterval(() => {
                this.checkThrowObjects();
            }, 250)
        );
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

    checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottle.levelStatusBar > 0) {
            // + or - depends where the character looks
            const addition = !this.character.otherDirection ? 100 : -30;
            const bottle = new ThrowableObject(this.character.x + addition, this.character.y + 80, this.character.otherDirection);
            this.bottles.push(bottle);
            this.character.soundBottleThrow.play();
            this.statusBarBottle.levelStatusBar -= 20;
            this.character.idleCounter = 0;
            this.statusBarBottle.setPercentage(this.statusBarBottle.levelStatusBar, this.statusBarBottle.IMAGES_BOTTLE);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.bottles.forEach((bottle, index) => {
                if (enemy.isColliding(bottle)) {
                    enemy.stopAnimate();
                    bottle.soundBottleSplash.play();
                    bottle.soundBottleBrokenGlas.play();
                    enemy.alive = false;
                }
                if (this.endboss.isColliding(bottle) && !bottle.hitEnemy) {
                    bottle.hitEnemy = true;
                    bottle.soundBottleSplash.play();
                    bottle.soundBottleBrokenGlas.play();
                    this.endboss.hit(20);
                    this.statusBarHealthEndboss.setPercentage(this.endboss.energy, this.statusBarHealthEndboss.IMAGES_HEALTH);
                }
            });
            if (this.character.isColliding(enemy) && enemy.alive && this.character.isAboveGround() && this.character.fallingDown) {
                enemy.alive = false;
                enemy.soundChickenDead.play();
                enemy.stopAnimate();
            }
            if (this.character.isColliding(enemy) && !this.character.isDead() && enemy.alive) {
                this.character.damagedCharacter();
                this.character.soundCharacterDamaged.play();
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
                bottle.soundBottleCollect.play();
                this.level.bottles.splice(index, 1);
            }
        });
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                coin.soundCoins.play();
                this.statusBarCoin.levelStatusBar += 4;
                this.statusBarCoin.setPercentage(this.statusBarCoin.levelStatusBar, this.statusBarCoin.IMAGES_COIN);
                this.level.coins.splice(index, 1);
            }
        });
    }

    draw() {
        this.outroScreen = this.character.isDead() ? new GameOver() : new YouWon();
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx?.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.bottles);
        this.ctx?.translate(-this.camera_x, 0);
        this.addStaticObjectToTheMap(this.statusBarHealth);
        this.addStaticObjectToTheMap(this.statusBarCoin);
        this.addStaticObjectToTheMap(this.statusBarBottle);
        this.character.x > 1900 || this.endboss.startEndBattle ? this.addStaticObjectToTheMap(this.statusBarHealthEndboss) : '';
        this.ctx?.translate(this.camera_x, 0);
        this.addToMapMovableObject(this.character);
        this.ctx?.translate(-this.camera_x, 0);
        this.continueOrStop();
    }

    continueOrStop() {
        // Draw() wird immer wieder aufgerufen bis Character oder Endboss "tot" ist.
        if (!this.character.isDead() && this.endboss.alive) {
            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        } else if (!this.endboss.alive && !this.endboss.alive) {
            this.addStaticObjectToTheMap(this.outroScreenLost);
            this.stopInterval();
            youWon();
        } else {
            this.soundGameOver.play();
            this.addStaticObjectToTheMap(this.outroScreenGameOver);
            this.soundBackgroundMusic.stop();
            this.stopInterval();
            gameOver();
        }
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
     * @param {StatusBar | GameOver | YouWon} item
     */
    addStaticObjectToTheMap(item) {
        if (this.ctx) {
            item.draw(this.ctx);
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

    stopInterval() {
        this.intervalIds.forEach(clearInterval);
    }
}
