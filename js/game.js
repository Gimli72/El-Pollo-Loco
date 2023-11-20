import { Keyboard, Level, World } from '../models/index.js';
import { getElementById, getImageElementById } from './script-utils.js';
import { dialogTemplate } from './script-templates.js';
import { level1 } from '../levels/level1.js';

/** @type {HTMLCanvasElement} */
let canvas;
let ctx;

let canvasElement = getElementById('canvas');
if (canvasElement && canvasElement instanceof HTMLCanvasElement) {
    canvas = canvasElement;
    ctx = canvas.getContext('2d');
}

/** @type {World} */
let world;

/** @type {Level} */
let level = level1;

/** @type {Keyboard} */
let keyboard = new Keyboard();

window.addEventListener('load', init);

//
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            keyboard.LEFT = true;
            keyboard.IDLE = false;
            break;
        case 'ArrowRight':
            keyboard.RIGHT = true;
            keyboard.IDLE = false;
            break;
        case 'ArrowUp':
            keyboard.UP = true;
            keyboard.IDLE = false;
            break;
        case 'ArrowDown':
            keyboard.DOWN = true;
            keyboard.IDLE = false;
            break;
        case ' ':
            keyboard.SPACE = true;
            keyboard.IDLE = false;
            break;
        case 'd':
            keyboard.D = true;
            keyboard.IDLE = false;
            break;
        case 'w':
            keyboard.W = true;
            keyboard.IDLE = false;
            break;
    }
});

//
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            keyboard.LEFT = false;
            keyboard.IDLE = true;
            break;
        case 'ArrowRight':
            keyboard.RIGHT = false;
            keyboard.IDLE = true;
            break;
        case 'ArrowUp':
            keyboard.UP = false;
            keyboard.IDLE = true;
            break;
        case 'ArrowDown':
            keyboard.DOWN = false;
            keyboard.IDLE = true;
            break;
        case ' ':
            keyboard.SPACE = false;
            keyboard.IDLE = true;
            break;
        case 'd':
            keyboard.D = false;
            keyboard.IDLE = true;
            break;
    }
});

//
getElementById('startGame').addEventListener('click', start);
//
getElementById('fullscreen').addEventListener('click', fullScreenCanvas);
//
getElementById('dialog').addEventListener('click', closeDialog);
//
getElementById('instructions').addEventListener('click', instructions);
//
getElementById('soundOnOff').addEventListener('click', soundOnOff);

function init() {
    let backgroundImg = new Image();
    backgroundImg.src = '../img/9_intro_outro_screens/start/startscreen_3.png';
    backgroundImg.onload = function () {
        ctx.drawImage(backgroundImg, 0, 0, 720, 480);
    };
}

/**
 * Start the game
 */
function start() {
    getElementById('startGameDiv').classList.add('d-none');
    getElementById('soundOnOffDiv').classList.remove('d-none');
    getElementById('canvas').focus();

    world = new World(canvas, keyboard, level);
}

/**
 * Switches to full-screen mode
 */
function fullScreenCanvas() {
    canvas.requestFullscreen();
    keyboard.W = false;
    getElementById('canvas').focus();
}

/**
 * Switch sound on/off
 */
function soundOnOff() {
    world.soundBackgroundMusic.toggleMute();
    getImageElementById('soundOnOffImage').src = `./img/0_icons/sound_${!world.soundBackgroundMusic.element.muted}.png`;
    getElementById('canvas').focus();
}

/**
 * Opens the instruction dialogue
 */
function instructions() {
    getElementById('dialog').innerHTML = '';
    getElementById('dialog').innerHTML = dialogTemplate();
    getElementById('dialog').classList.remove('d-none');
    getElementById('canvas').focus();
}

/**
 * Close instructions
 */
function closeDialog() {
    getElementById('dialog').classList.add('d-none');
    getElementById('canvas').focus();
}
