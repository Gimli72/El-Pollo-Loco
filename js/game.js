import { Keyboard, Level, World } from "../models/index.js";
import { getElementById } from "./script-utils.js";
import { level1 } from '../levels/level1.js';

/** @type {HTMLCanvasElement} */
let canvas;
/** @type {World} */
let world;
/** @type {Level} */
let level = level1;
/** @type {Keyboard} */
let keyboard = new Keyboard();

window.addEventListener("load", start);

function init() {
    // @ts-expect-error - HTMLCanvasElement
    canvas = getElementById("canvas");
    world = new World(canvas, keyboard, level);
    // console.log('My Character is', world.character);
    // console.log('My Enemies is', world.enemies);
    // console.log('My World is', world);
    // console.log('Cloud', world.clouds[0].x)
} 

//
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            keyboard.LEFT = true;
            keyboard.IDLE = false;
            break;
        case "ArrowRight":
            keyboard.RIGHT = true;
            keyboard.IDLE = false;
            break;
        case "ArrowUp":
            keyboard.UP = true;
            keyboard.IDLE = false;
            break;
        case "ArrowDown":
            keyboard.DOWN = true;
            keyboard.IDLE = false;
            break;
        case " ":
            keyboard.SPACE = true;
            keyboard.IDLE = false;
            break;
        case "d":
            keyboard.D = true;
            keyboard.IDLE = false;
            break;
        case "w":
            keyboard.W = true;            
            keyboard.IDLE = false;
            break;
    }
});

//
window.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "ArrowLeft":
            keyboard.LEFT = false;
            keyboard.IDLE = true;
            break;
        case "ArrowRight":
            keyboard.RIGHT = false;
            keyboard.IDLE = true;
            break;
        case "ArrowUp":
            keyboard.UP = false;
            keyboard.IDLE = true;
            break;
        case "ArrowDown":
            keyboard.DOWN = false;
            keyboard.IDLE = true;
            break;
        case " ":
            keyboard.SPACE = false;
            keyboard.IDLE = true;
            break;
        case "d":
            keyboard.D = false;
            keyboard.IDLE = true;
            break;
    }
});

getElementById("tryAgain").addEventListener("click", start);

getElementById("startGame").addEventListener("click", init);

function start() {
    const canvas = getElementById("canvas");
     // @ts-expect-error - HTMLCanvasElement
    const ctx = canvas.getContext("2d");
    let backgroundImg = new Image();
    backgroundImg.src = "../img/9_intro_outro_screens/start/startscreen_1.png";
    backgroundImg.onload = function(){
        ctx.drawImage(backgroundImg,0,0, 720, 480);
    }
}
