import { Character, MovableObject, Keyboard, StatusBar, ThrowableObject, StatusBarHealth, StatusBarCoin, StatusBarBottle, StatusBarHealthEndboss, Level, GameOver, Sound } from './index.js';

export class World {
    /** @type {Keyboard} */
    keyboard;
    /** @type {HTMLCanvasElement} */
    canvas;

    ctx;
    camera_x = 0;
    fps = 60;

    character = new Character();
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarHealthEndboss = new StatusBarHealthEndboss();
    gameOver = new GameOver();

    /** @type {ThrowableObject[]} */
    throwableObjects = [];

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
            // + or - depends where the character looks
            let addition = !this.character.otherDirection ? 100 : -30;
            let bottle = new ThrowableObject(this.character.x + addition, this.character.y + 80, this.character.otherDirection);
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
                    bottle.sounds.playAudio('audioBottleSplash');
                    bottle.sounds.playAudio('audioBottleBrokenGlas');
                    enemy.alive = false;
                }
                if (this.endboss.isColliding(bottle) && !bottle.hitEnemy) {
                    bottle.hitEnemy = true;
                    bottle.sounds.playAudio('audioBottleSplash');
                    bottle.sounds.playAudio('audioBottleBrokenGlas');
                    this.endboss.hit(20);
                    this.statusBarHealthEndboss.setPercentage(this.endboss.energy, this.statusBarHealthEndboss.IMAGES_HEALTH);
                }
            });
            if (this.character.isColliding(enemy) && enemy.alive && this.character.isAboveGround() && this.character.fallingDown) {
                enemy.alive = false;
                enemy.sounds.playAudio('audioChickenDead');
                enemy.stopAnimate();
            }
            if (this.character.isColliding(enemy) && !this.character.isDead() && enemy.alive) {
                this.character.damagedCharacter();
                this.character.isHurt() ? '' : enemy.sounds.setPlayed('soundCharacterDamaged');
                if (!enemy.sounds.playAudioPlayed('soundCharacterDamaged')) {
                    enemy.sounds.playAudio('soundCharacterDamaged');
                    enemy.sounds.setPlayed('soundCharacterDamaged');
                }
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
                bottle.sounds.playAudio('audioBottleCollect');
                this.level.bottles.splice(index, 1);
            }
        });
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                coin.sounds.playAudio('audioCoins');
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
        this.addStaticObjectToTheMap(this.statusBarHealth);
        this.addStaticObjectToTheMap(this.statusBarCoin);
        this.addStaticObjectToTheMap(this.statusBarBottle);
        if (this.character.isDead()) {
            !this.character.sounds.playAudioPlayed('audioCharacterDeadPlay') ? this.character.sounds.playAudioPlayed('audioCharacterDeadPlay') : '';
            this.character.sounds.setPlayed('audioCharacterDeadPlay');
            this.addStaticObjectToTheMap(this.gameOver);
        }
        this.character.x > 1900 || this.endboss.startEndBattle ? this.addStaticObjectToTheMap(this.statusBarHealthEndboss) : '';

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
     * @param {StatusBar | GameOver} item
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
}
