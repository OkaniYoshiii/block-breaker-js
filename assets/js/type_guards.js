/**
 * @param { unknown } val 
 * @returns { val is HTMLCanvasElement }
 */
export function isHTMLCanvasElement(val) {
    return val instanceof HTMLCanvasElement
}

/**
 * @param { unknown } val 
 * @returns { val is MouseEvent }
 */
export function isMouseEvent(val) {
    return val instanceof MouseEvent
}

/**
 * @param { unknown } val 
 * @returns { val is KeyboardEvent }
 */
export function isKeyboardEvent(val) {
    return val instanceof KeyboardEvent
}