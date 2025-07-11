/**
 * @typedef { Object } Vector
 * @property { number } x
 * @property { number } y
 */

/**
 * 
 * @param { Vector } vect1 
 * @param { Vector } vect2 
 */
export function distance(vect1, vect2) {
    const dx = vect1.x - vect2.x
    const dy = vect1.y - vect2.y

    return Math.sqrt(dx * dx + dy * dy)
}