/**
 * Retrieves an HTMLElement by its ID.
 *
 * @param {string} id - The ID of the HTMLElement to retrieve.
 * @returns {HTMLElement} The HTMLElement object with the specified ID.
 * @throws {Error} If no element with the specified ID is found.
 */
export function getElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Element with id ${id} not found!`);
    }
    return element;
}


/**
 * Retrieves an HTMLImageElement by its ID.
 * 
 * @param {string} id - The ID of the HTML image element.
 * @returns {HTMLImageElement} The HTML image element.
 * @throws {Error} If the element with the provided ID is not an image.
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
 * Retrieves an HTMLInputElement by its ID.
 *
 * @param {string} id - The ID of the HTMLInputElement to retrieve.
 * @returns {HTMLInputElement} The HTMLInputElement object with the specified ID.
 * @throws {Error} If the element with the specified ID is not an HTMLInputElement.
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
 * Retrieves an HTMLCanvasElement by its ID.
 *
 * @param {string} id - The ID of the HTMLCanvasElement to retrieve.
 * @returns {HTMLCanvasElement} The HTMLCanvasElement object with the specified ID.
 * @throws {Error} If the element with the specified ID is not an HTMLCanvasElement.
 */
export function getCanvasElementById(id) {
    const element = getElementById(id);
    if (element instanceof HTMLCanvasElement) {
        return element;
    } else {
        throw new Error(`Element with id ${id} is not a canvas!`);
    }
}
