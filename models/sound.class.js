export class Sound {
    /**
     * @typedef {'soundBottleSplash' | 'soundBottleBrokenGlas' | 'soundBottleCollect' | 'soundCoins' | 'soundCharacterJump' | 'soundCharacterDead' | 'soundChickenDead' | 'soundBackgroundMusic' | 'soundEndbossDead' | 'soundEndbossDeadFloor' | 'soundCharacterDamaged' | 'soundCharacterWalking' | 'soundEndbossEndGame'} SoundName
     */
    /**
     * Array of sound objects.
     * @type {Array<{name: SoundName, src: string, volume: number, played: boolean, repeat: boolean}>}
     */
    sounds = [
        {
            name: 'soundBottleSplash',
            src: '../audio/audio_throwable-object_splash.mp3',
            volume: 0.8,
            played: false,
            repeat: false,
        },
        {
            name: 'soundBottleBrokenGlas',
            src: '../audio/audio_throwable-object_broken-glas.mp3',
            volume: 0.7,
            played: false,
            repeat: false,
        },
        {
            name: 'soundBottleCollect',
            src: '../audio/audio_throwable-object_collect.mp3',
            volume: 0.7,
            played: false,
            repeat: false,
        },
        {
            name: 'soundCoins',
            src: '../audio/audio_pickUpCoin.mp3',
            volume: 0.8,
            played: false,
            repeat: false,
        },
        {
            name: 'soundCharacterJump',
            src: '../audio/audio_character-jump.mp3',
            volume: 0.1,
            played: false,
            repeat: false,
        },
        {
            name: 'soundCharacterDead',
            src: '../audio/audio_character-dead.mp3',
            volume: 0.7,
            played: false,
            repeat: false,
        },
        {
            name: 'soundChickenDead',
            src: '../audio/audio_chicken-dead.mp3',
            volume: 0.7,
            played: false,
            repeat: false,
        },
        {
            name: 'soundBackgroundMusic',
            src: '../audio/audio_background-musik4.mp3',
            volume: 0.01,
            played: false,
            repeat: true,
        },
        {
            name: 'soundEndbossDead',
            src: '../audio/audio_endboss-dead.mp3',
            volume: 0.9,
            played: false,
            repeat: false,
        },
        {
            name: 'soundEndbossDeadFloor',
            src: '../audio/audio_endboss-dead-floor.mp3',
            volume: 0.8,
            played: false,
            repeat: false,
        },
        {
            name: 'soundCharacterDamaged',
            src: '../audio/audio_character-damaged.mp3',
            volume: 0.8,
            played: false,
            repeat: false,
        },
        {
            name: 'soundCharacterWalking',
            src: '../audio/audio_character-walking.mp3',
            volume: 1,
            played: false,
            repeat: false,
        },
        {
            name: 'soundEndbossEndGame',
            src: '../audio/audio_endboss-endgame2.mp3',
            volume: 1,
            played: false,
            repeat: true,
        },
    ];

    audioOff = false;

    activeAudios = {};

    constructor() {
        // this.playAudio('soundBackgroundMusic');
    }

    /**
     *
     * @param {string} audioName
     */
    playAudio(audioName) {
        if (!this.activeAudios[audioName]) {
            const audioObject = this.sounds.find((audio) => audio.name === audioName);
            if (audioObject) {
                const audioElement = new Audio(audioObject.src);
                audioElement.volume = audioObject.volume;
                audioElement.addEventListener('ended', () => {
                    if (!audioObject.repeat) {
                        this.stopAudio(audioName);
                    } else {
                        this.stopAudio(audioName);
                        this.playAudio(audioName);
                    }
                });
                this.activeAudios[audioName] = audioElement;
            }
        }
        if (this.activeAudios[audioName] && !this.audioOff) {
            this.activeAudios[audioName].play();
        }
    }

    /**
     *
     * @param {string} audioName
     */
    stopAudio(audioName) {
        if (this.activeAudios[audioName]) {
            console.log("Stop");
            delete this.activeAudios[audioName];
            console.log(this.activeAudios);
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
