export let gameMuted = false
export const gameMutedEvent = new Event("global-mute");
/**
 * 
 * @param {boolean} muted 
 */
export function setMuted(muted) {
    gameMuted = muted;
}