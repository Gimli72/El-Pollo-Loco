export class Sound {
    /**
     * @typedef {'audioBottleSplash' | 'audioBottleBrokenGlas' | 'audioBottleCollect' | 'audioCoins' | 'audioCharacterJump' | 'audioCharacterDead' | 'audioChickenDead' | 'audioBackgroundMusic'} SoundName
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
            played: false
        },
        {
            name: 'audioBottleBrokenGlas',
            src: '../audio/audio_throwable-object_broken-glas.mp3',
            volume: 0.7,
            played: false
        },
        {
            name: 'audioBottleCollect',
            src: '../audio/audio_throwable-object_collect.mp3',
            volume: 0.7,
            played: false
        },
        {
            name: 'audioCoins',
            src: '../audio/audio_coins.mp3',
            volume: 0.8,
            played: false
        },
        {
            name: 'audioCharacterJump',
            src: '../audio/audio_character-jump.mp3',
            volume: 0.7,
            played: false
        },
        {
            name: 'audioCharacterDead',
            src: '../audio/audio_character-dead.mp3',
            volume: 0.7,
            played: false
        },
        {
            name: 'audioChickenDead',
            src: '../audio/audio_chicken-dead.mp3',
            volume: 0.7,
            played: false
        },
        {
            name: 'audioBackgroundMusic',
            src: '../audio/audio_background-musik.mp3',
            volume: 0.01,
            played: false
        },
    ];

    audioOff = false;

    constructor() {
        // this.playAudio('audioBackgroundMusic');
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
            audioObject.played = true;
        }
    }
}
