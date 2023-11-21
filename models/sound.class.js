import { gameMuted } from '../js/muted.js';
export class Sound {
    /**
     * @typedef {'soundBottleSplash' | 'soundBottleBrokenGlas' | 'soundBottleCollect' | 'soundCoins' | 'soundCharacterJump' | 'soundCharacterDead' | 'soundChickenDead' | 'soundBackgroundMusic' | 'soundEndbossDead' | 'soundEndbossDeadFloor' | 'soundCharacterDamaged' | 'soundCharacterWalking' | 'soundEndbossEndGame' | 'soundBottleThrow'} SoundName
     */
    /**
     * Array of sound objects.
     * @type {Array<{name: SoundName, path: string, volume: number}>}
     */
    sounds = [
        {
            name: 'soundBottleSplash',
            path: '../audio/audio_throwable-object_splash.mp3',
            volume: 0.8,
        },
        {
            name: 'soundBottleBrokenGlas',
            path: '../audio/audio_throwable-object_broken-glas.mp3',
            volume: 0.7,
        },
        {
            name: 'soundBottleCollect',
            path: '../audio/audio_throwable-object_collect.mp3',
            volume: 0.7,
        },
        {
            name: 'soundCoins',
            path: '../audio/audio_pickUpCoin.mp3',
            volume: 0.8,
        },
        {
            name: 'soundCharacterJump',
            path: '../audio/audio_character-jump.mp3',
            volume: 0.1,
        },
        {
            name: 'soundCharacterDead',
            path: '../audio/audio_character-dead.mp3',
            volume: 0.7,
        },
        {
            name: 'soundChickenDead',
            path: '../audio/audio_chicken-dead.mp3',
            volume: 0.7,
        },
        {
            name: 'soundBackgroundMusic',
            path: '../audio/audio_background-musik4.mp3',
            volume: 0.5,
        },
        {
            name: 'soundEndbossDead',
            path: '../audio/audio_endboss-dead.mp3',
            volume: 0.9,
        },
        {
            name: 'soundEndbossDeadFloor',
            path: '../audio/audio_endboss-dead-floor.mp3',
            volume: 0.8,
        },
        {
            name: 'soundCharacterDamaged',
            path: '../audio/audio_character-damaged.mp3',
            volume: 0.8,
        },
        {
            name: 'soundCharacterWalking',
            path: '../audio/audio_character-walking.mp3',
            volume: 1,
        },
        {
            name: 'soundEndbossEndGame',
            path: '../audio/audio_endboss-endgame2.mp3',
            volume: 0.5,
        },
        {
            name: 'soundBottleThrow',
            path: '../audio/audio_throwable-object_throw.mp3',
            volume: 1,
        },
    ];

    /** @type {number} */
    volume = 1;

    /** @type {SoundName} */
    sound;

    /** @type {boolean} */
    loop = false;

    /** @type {HTMLAudioElement} */
    element;

    /**
     *
     * @param {SoundName} sound
     * @param {boolean} loop
     */
    constructor(sound, loop = false) {
        this.sound = sound;
        this.loop = loop;
        this.createElement();
        document.body.addEventListener('global-mute', () => {
            this.element.muted = gameMuted;
        });
    }

    createElement() {
        const soundObject = this.sounds.find((soundObject) => soundObject.name === this.sound);
        if (soundObject) {
            this.element = new Audio(soundObject.path);
            this.element.volume = soundObject.volume;
            this.element.loop = this.loop;
            this.volume = soundObject.volume;
            this.element.muted = gameMuted;
        } else {
            throw new Error(`Sound ${this.sound} not found!`);
        }
    }

    stop() {
        this.element.pause();
    }

    play() {
        this.element.play();
        this.element.muted = gameMuted;
    }

    toggleMute() {
        this.element.volume = this.element.volume === 0 ? this.volume : 0;
    }

    ended() {
        return this.element.ended;
    }
}
