export class Sound {
    /**
     * @typedef {'soundBottleSplash' | 'soundBottleBrokenGlas' | 'soundBottleCollect' | 'soundCoins' | 'soundCharacterJump' | 'soundCharacterDead' | 'soundChickenDead' | 'soundBackgroundMusic' | 'soundEndbossDead' | 'soundEndbossDeadFloor' | 'soundCharacterDamaged' | 'soundCharacterWalking' | 'soundEndbossEndGame' | 'soundBottleThrow'} SoundName
     */
    /**
     * Array of sound objects.
     * @type {Array<{name: SoundName, src: string, volume: number, loop: boolean}>}
     */
    sounds = [
        {
            name: 'soundBottleSplash',
            src: '../audio/audio_throwable-object_splash.mp3',
            volume: 0.8,
            loop: false,
        },
        {
            name: 'soundBottleBrokenGlas',
            src: '../audio/audio_throwable-object_broken-glas.mp3',
            volume: 0.7,
            loop: false,
        },
        {
            name: 'soundBottleCollect',
            src: '../audio/audio_throwable-object_collect.mp3',
            volume: 0.7,
            loop: false,
        },
        {
            name: 'soundCoins',
            src: '../audio/audio_pickUpCoin.mp3',
            volume: 0.8,
            loop: false,
        },
        {
            name: 'soundCharacterJump',
            src: '../audio/audio_character-jump.mp3',
            volume: 0.1,
            loop: false,
        },
        {
            name: 'soundCharacterDead',
            src: '../audio/audio_character-dead.mp3',
            volume: 0.7,
            loop: false,
        },
        {
            name: 'soundChickenDead',
            src: '../audio/audio_chicken-dead.mp3',
            volume: 0.7,
            loop: false,
        },
        {
            name: 'soundBackgroundMusic',
            src: '../audio/audio_background-musik4.mp3',
            volume: 0.5,
            loop: true,
        },
        {
            name: 'soundEndbossDead',
            src: '../audio/audio_endboss-dead.mp3',
            volume: 0.9,
            loop: false,
        },
        {
            name: 'soundEndbossDeadFloor',
            src: '../audio/audio_endboss-dead-floor.mp3',
            volume: 0.8,
            loop: false,
        },
        {
            name: 'soundCharacterDamaged',
            src: '../audio/audio_character-damaged.mp3',
            volume: 0.8,
            loop: false,
        },
        {
            name: 'soundCharacterWalking',
            src: '../audio/audio_character-walking.mp3',
            volume: 1,
            loop: false,
        },
        {
            name: 'soundEndbossEndGame',
            src: '../audio/audio_endboss-endgame2.mp3',
            volume: 0.5,
            loop: true,
        },
        {
            name: 'soundBottleThrow',
            src: '../audio/audio_throwable-object_throw.mp3',
            volume: 1,
            loop: false,
        },
    ];

    /** @type {boolean} */
    muted = false;

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
    }

    createElement() {
        const soundObject = this.sounds.find((soundObject) => soundObject.name === this.sound);
        if (soundObject) {
            this.element = new Audio(soundObject.src);
            this.element.volume = soundObject.volume;
            this.element.loop = soundObject.loop;
        } else {
            console.log('Fehler', this.sound);
        }
    }

    stop() {
        this.element.pause();
    }

    play() {
        this.element.play();
    }

    toggleMute() {
        this.element.muted = !this.element.muted;
    }

    ended() {
        return this.element.ended;
    }
}
