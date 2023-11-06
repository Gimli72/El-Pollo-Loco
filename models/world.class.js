import { Character, MovableObject, Keyboard, StatusBar } from './index.js';
import { level1 } from '../levels/level1.js';

export class World {
    level = level1;

    character = new Character();
    keyboard;
    canvas;
    ctx;
    camera_x = 0;
    statusBar = new StatusBar();

    fps = 60;

    /**
     * @param {Keyboard} keyboard
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollisions();
    }

    setWorld() {
        this.character.world = this;
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && !this.character.isDead()) {
                  this.character.hit();
                  this.statusBar.setPercentage(this.character.energy);
                }
            });
        }, 200);
    }

    draw() {
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx?.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.ctx?.translate(-this.camera_x, 0);
        this.addToMapStatusBar(this.statusBar);
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
