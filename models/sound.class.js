export class Sound {
    /**
     * @typedef {'audioBottleSplash' | 'audioBottleBrokenGlas' | 'audioBottleCollect' | 'audioCoins' | 'audioCharacterJump' | 'audioCharacterDead' | 'audioChickenDead' | 'soundBackgroundMusic' | 'soundEndbossDead' | 'soundEndbossDeadFloor' | 'soundCharacterDamaged' | 'soundCharacterWalking'} SoundName
     */
    /**
     * Array of sound objects.
     * @type {Array<{name: SoundName, src: string, volume: number, played: boolean}>}
     */
    sounds = [
        {
            name: 'audioBottleSplash',
            src: '../audio/audio_throwable-object_splash.mp3',
            volume: 0.8,
            played: false,
        },
        {
            name: 'audioBottleBrokenGlas',
            src: '../audio/audio_throwable-object_broken-glas.mp3',
            volume: 0.7,
            played: false,
        },
        {
            name: 'audioBottleCollect',
            src: '../audio/audio_throwable-object_collect.mp3',
            volume: 0.7,
            played: false,
        },
        {
            name: 'audioCoins',
            src: '../audio/audio_pickUpCoin.mp3',
            volume: 0.8,
            played: false,
        },
        {
            name: 'audioCharacterJump',
            src: '../audio/audio_character-jump.mp3',
            volume: 0.2,
            played: false,
        },
        {
            name: 'audioCharacterDead',
            src: '../audio/audio_character-dead.mp3',
            volume: 0.7,
            played: false,
        },
        {
            name: 'audioChickenDead',
            src: '../audio/audio_chicken-dead.mp3',
            volume: 0.7,
            played: false,
        },
        {
            name: 'soundBackgroundMusic',
            src: '../audio/audio_background-musik3.mp3',
            volume: 0.03,
            played: false,
        },
        {
            name: 'soundEndbossDead',
            src: '../audio/audio_endboss-dead.mp3',
            volume: 0.9,
            played: false,
        },
        {
            name: 'soundEndbossDeadFloor',
            src: '../audio/audio_endboss-dead-floor.mp3',
            volume: 0.8,
            played: false,
        },
        {
            name: 'soundCharacterDamaged',
            src: '../audio/audio_character-damaged.mp3',
            volume: 0.8,
            played: false,
        },
        {
            name: 'soundCharacterWalking',
            src: '../audio/audio_character-walking.mp3',
            volume: 0.8,
            played: false,
        },
    ];

    audioOff = false;

    constructor() {
        // this.playAudio('soundBackgroundMusic');
    }

    /**
     *
     * @param {string} audioName
     */
    playAudio(audioName) {
        const audioObject = this.sounds.find((audio) => audio.name === audioName);
        if (audioObject) {
            const audioElement = new Audio(audioObject.src);
            audioElement.volume = audioObject.volume;
            !this.audioOff ? audioElement.play() : '';
        }
    }

    /**
     *
     * @param {string} audioName
     * @returns
     */
    playAudioPlayed(audioName) {
        const audioObject = this.sounds.find((audio) => audio.name === audioName);
        if (audioObject) {
            return audioObject.played;
        }
    }

    /**
     *
     * @param {string} audioName
     */
    setPlayed(audioName) {
        const audioObject = this.sounds.find((audio) => audio.name === audioName);
        if (audioObject) {
            audioObject.played = !audioObject.played;
        }
    }
}
