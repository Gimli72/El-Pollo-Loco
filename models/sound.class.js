export class Sound {
    /**
     * @typedef {'soundBottleSplash' | 'soundBottleBrokenGlas' | 'soundBottleCollect' | 'soundCoins' | 'soundCharacterJump' | 'soundCharacterDead' | 'soundChickenDead' | 'soundBackgroundMusic' | 'soundEndbossDead' | 'soundEndbossDeadFloor' | 'soundCharacterDamaged' | 'soundCharacterWalking' | 'soundEndbossEndGame'} SoundName
     */
    /**
     * Array of sound objects.
     * @type {Array<{name: SoundName, src: string, volume: number, played: boolean, loop: boolean}>}
     */
    sounds = [
        {
            name: 'soundBottleSplash',
            src: '../audio/audio_throwable-object_splash.mp3',
            volume: 0.8,
            played: false,
            loop: false,
        },
        {
            name: 'soundBottleBrokenGlas',
            src: '../audio/audio_throwable-object_broken-glas.mp3',
            volume: 0.7,
            played: false,
            loop: false,
        },
        {
            name: 'soundBottleCollect',
            src: '../audio/audio_throwable-object_collect.mp3',
            volume: 0.7,
            played: false,
            loop: false,
        },
        {
            name: 'soundCoins',
            src: '../audio/audio_pickUpCoin.mp3',
            volume: 0.8,
            played: false,
            loop: false,
        },
        {
            name: 'soundCharacterJump',
            src: '../audio/audio_character-jump.mp3',
            volume: 0.1,
            played: false,
            loop: false,
        },
        {
            name: 'soundCharacterDead',
            src: '../audio/audio_character-dead.mp3',
            volume: 0.7,
            played: false,
            loop: false,
        },
        {
            name: 'soundChickenDead',
            src: '../audio/audio_chicken-dead.mp3',
            volume: 0.7,
            played: false,
            loop: false,
        },
        {
            name: 'soundBackgroundMusic',
            src: '../audio/audio_background-musik4.mp3',
            volume: 0.01,
            played: false,
            loop: true,
        },
        {
            name: 'soundEndbossDead',
            src: '../audio/audio_endboss-dead.mp3',
            volume: 0.9,
            played: false,
            loop: false,
        },
        {
            name: 'soundEndbossDeadFloor',
            src: '../audio/audio_endboss-dead-floor.mp3',
            volume: 0.8,
            played: false,
            loop: false,
        },
        {
            name: 'soundCharacterDamaged',
            src: '../audio/audio_character-damaged.mp3',
            volume: 0.8,
            played: false,
            loop: false,
        },
        {
            name: 'soundCharacterWalking',
            src: '../audio/audio_character-walking.mp3',
            volume: 1,
            played: false,
            loop: false,
        },
        {
            name: 'soundEndbossEndGame',
            src: '../audio/audio_endboss-endgame2.mp3',
            volume: 1,
            played: false,
            loop: true,
        },
    ];

    muted = true;

    activeAudios = {};

    constructor() {
        // this.playAudio('soundBackgroundMusic');
    }

    /**
     *
     * @param {SoundName} soundName
     */
    playAudio(soundName) {        
        if (!this.activeAudios[soundName]) {
            const audioObject = this.sounds.find((audio) => audio.name === soundName);
            if (audioObject) {
                const audioElement = new Audio(audioObject.src);
                audioElement.volume = audioObject.volume;
                audioElement.loop = audioObject.loop;
                audioElement.addEventListener('ended', () => {
                    if (!audioObject.loop) {
                        this.removeAudioElementFromList(soundName);
                        audioElement.remove();
                    }
                });
                this.activeAudios[soundName] = audioElement;
            }
        }
        const activeAudioElement = this.activeAudios[soundName];
        if (activeAudioElement && this.muted) {
            activeAudioElement.play();
        }
    }

    // playAudio(soundName) {
    //     const activeAudioElement = this.activeAudios[soundName];
    //     const audioObject = this.sounds.find((audio) => audio.name === soundName);

    //     if (activeAudioElement && this.muted) {
    //         activeAudioElement.play();
    //     } else if (audioObject && !this.muted) {
    //         const audioElement = new Audio(audioObject.src);
    //         audioElement.volume = audioObject.volume;
    //         audioElement.loop = audioObject.loop;
    //         this.activeAudios[soundName] = audioElement;
    //         audioElement.play();
    //         audioElement.addEventListener('ended', () => {
    //             if (!audioObject.loop) {
    //                 this.removeAudioElementFromList(soundName);
    //             }
    //         });
    //     }
    // }

    /**
     *
     * @param {SoundName} soundName
     */
    removeAudioElementFromList(soundName) {
        if (this.activeAudios[soundName]) {
            console.log('Stop');
            delete this.activeAudios[soundName];
            console.log(this.activeAudios);
        }
    }

    /**
     *
     * @param {SoundName} soundName
     * @returns
     */
    playAudioPlayed(soundName) {
        const audioObject = this.sounds.find((audio) => audio.name === soundName);
        if (audioObject) {
            return audioObject.played;
        }
    }

    /**
     *
     * @param {SoundName} soundName
     */
    togglePlayback(soundName) {
        const audioObject = this.sounds.find((audio) => audio.name === soundName);
        if (audioObject) {
            audioObject.played = !audioObject.played;
        }
    }
}
