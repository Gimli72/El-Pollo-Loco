import { gameMuted, setMuted, gameMutedEvent } from './muted.js';
import { Keyboard, Level, World } from '../models/index.js';
import { getElementById, getImageElementById, getCanvasElementById } from './utils.js';
import { dialogTemplate } from './templates.js';
import { level1 } from '../levels/level1.js';

/** @type {HTMLCanvasElement} */
const canvas = getCanvasElementById('canvas');
const ctx = canvas.getContext('2d');

/** @type {World} */
let world;

/** @type {Keyboard} */
let keyboard = new Keyboard();

window.addEventListener('load', init);

/**
 * Navigation for mobile phones
 */
function mobilTouchPressEvents() {
    getElementById('btnMoveleft').addEventListener('pointerdown', (event) => {
        keyboard.LEFT = true;
    });
    getElementById('btnMoveleft').addEventListener('pointerup', (event) => {
        keyboard.LEFT = false;
    });
    getElementById('btnMoveRight').addEventListener('pointerdown', (event) => {
        keyboard.RIGHT = true;
    });
    getElementById('btnMoveRight').addEventListener('pointerup', (event) => {
        keyboard.RIGHT = false;
    });
    getElementById('btnThrow').addEventListener('pointerdown', (event) => {
        event.preventDefault();
        keyboard.D = true;
    });
    getElementById('btnThrow').addEventListener('pointerdown', (event) => {
        event.preventDefault();
        keyboard.D = false;
    });
    getElementById('btnJump').addEventListener('pointerdown', (event) => {
        keyboard.SPACE = true;
    });
    getElementById('btnJump').addEventListener('pointerup', (event) => {
        keyboard.SPACE = false;
    });
    getElementById('btnPlay').addEventListener('pointerdown', (event) => {
        getElementById('btnPlay').classList.add('d-none');
        event.preventDefault();
        start();
    });
    getElementById('btnSoundOnOff').addEventListener('pointerdown', (event) => {
        event.preventDefault();
        soundOnOff('mobilSoundOnOffImage');
    });
}

/**
 * Desktop navigation
 */
function desktopClickEvents() {
    //
    getElementById('tryAgain').addEventListener('click', restart);

    //
    getElementById('fullscreen').addEventListener('click', fullScreenCanvas);
    //
    getElementById('dialog').addEventListener('click', closeDialog);
    //
    getElementById('instructions').addEventListener('click', instructions);
    //
    getElementById('soundOnOff').addEventListener('click', function () {
        soundOnOff('soundOnOffImage');
        this.blur();
    });
    //
    getElementById('startGame').addEventListener('click', (event) => {
        getElementById('startGameDiv').classList.add('d-none');
        getElementById('soundOnOffDiv').classList.remove('d-none');
        event.preventDefault();
        start();
    });
}

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

function init() {
    const backgroundImg = new Image();
    backgroundImg.src = './img/9_intro_outro_screens/start/startscreen_3.png';
    backgroundImg.onload = () => {
        ctx?.drawImage(backgroundImg, 0, 0, 720, 480);
    };
    mobilTouchPressEvents();
    desktopClickEvents();
}

/**
 * Start the game
 */
function start() {
    getElementById('canvas').focus();
    const firstLevel = level1();
    loadLevel(firstLevel);
}

/**
 *
 * @param {Level} level
 */
function loadLevel(level) {
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
function soundOnOff(id) {
    setMuted(!gameMuted);
    document.body.dispatchEvent(gameMutedEvent);
    getImageElementById(id).src = `./img/0_icons/sound_${!gameMuted}.png`;
    getCanvasElementById('canvas').focus();
}

/**
 * Opens the instruction dialogue
 */
function instructions() {
    getElementById('dialog').innerHTML = '';
    getElementById('dialog').innerHTML = dialogTemplate();
    getElementById('dialog').classList.remove('d-none');
    getCanvasElementById('canvas').focus();
}

/**
 * Close instructions
 */
function closeDialog() {
    getElementById('dialog').classList.add('d-none');
    getCanvasElementById('canvas').focus();
}

/**
 * Restart the game
 */
function restart() {
    getElementById('nav').classList.remove('d-none');
    getElementById('gameOver').classList.add('d-none');
    getElementById('panel').classList.remove('d-none');
    world.endboss.soundEndbossEndGame.stop();
    world.soundBackgroundMusic.stop();
    world.soundGameOver.stop();
    world.endboss.soundYouWon.stop();
    start();
}

/**
 * Game over screen
 */
export function gameOver() {
    getElementById('buttonText').textContent = 'Try again';
    getImageElementById('buttonImage').src = './img/0_icons/restart.png';
    getElementById('nav').classList.add('d-none');
    getElementById('panel').classList.add('d-none');
    getElementById('gameOver').classList.remove('d-none');
    getElementById('canvas').focus();
}

/**
 * Win the game and play again.
 */
export function youWon() {
    getElementById('buttonText').textContent = 'Play again';
    getImageElementById('buttonImage').src = './img/0_icons/play.png';
    getElementById('nav').classList.add('d-none');
    getElementById('panel').classList.add('d-none');
    getElementById('gameOver').classList.remove('d-none');
    getElementById('canvas').focus();
}
