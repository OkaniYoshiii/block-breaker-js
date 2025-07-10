/**
 * @param { number } val 
 * @returns { number }
 */
export function radToDeg(val) {
    return val * (180 / Math.PI)
}

/**
 * @param { number } val 
 * @returns { number }
 */
export function degToRad(val) {
    return val * (Math.PI / 180)
}