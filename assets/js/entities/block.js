/**
 * @typedef { Object } Block
 * @property { number } x
 * @property { number } y
 * @property { number } width
 * @property { number } height
 */

/**
 * @param { number } x 
 * @param { number } y 
 * @param { number } width 
 * @param { number } height 
 * 
 * @returns { Block }
 */
export function newBlock(x, y, width, height) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
    } 
}

/**
 * @param { Block } block 
 * @param { CanvasRenderingContext2D } context
 */
export function draw(block, context) {
    context.fillRect(block.x, block.y, block.width, block.height)
}