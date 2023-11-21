// @ts-check

// ******************
//
// Standard Function
//
// ******************

/**
 * Checks whether the passed ID exists and returns the element.
 * @param {string} id
 * @returns {HTMLElement}
 */
export function getElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id ${id} not found!`);
    }
    return element;
}

/**
 * Checks whether the passed ID exists and returns the image element.
 * @param {string} id
 * @returns {HTMLImageElement}
 */
export function getImageElementById(id) {
    const element = getElementById(id);
    if (element instanceof HTMLImageElement) {
        return element;
    } else {
        throw new Error(`Element with id ${id} is not an image!`);
    }
}

/**
 * Checks whether the passed ID exists and returns the input element.
 * @param {string} id
 * @returns {HTMLInputElement}
 */
export function getInputElementById(id) {
    const element = getElementById(id);
    if (element instanceof HTMLInputElement) {
        return element;
    } else {
        throw new Error(`Element with id ${id} is not an input!`);
    }
}

/**
 * Checks whether the passed ID exists and returns the canvas element.
 * @param {string} id
 * @returns {HTMLCanvasElement}
 */
export function getCanvasElementById(id) {
    const element = getElementById(id);
    if (element instanceof HTMLCanvasElement) {
        return element;
    } else {
        throw new Error(`Element with id ${id} is not an canvas!`);
    }
}


/**
 * Create an UUID
 * @returns string with UUID
 */
export function randomUUID() {
    const webCrypto = globalThis.crypto;
    return webCrypto.randomUUID();
}
