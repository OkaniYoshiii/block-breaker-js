/**
 * @typedef { Object } Player
 * @property { number } x
 * @property { number } y
 * @property { number } width
 * @property { number } height
 * @property { number } dirX
 * @property { number } dirY
 */

/**
 * @param { number } x 
 * @param { number } y 
 * @param { number } width
 * @param { number } height 
 * @returns { Player }
 */
export function newPlayer(x, y, width, height) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,

        dirX: 0,
        dirY: 0,
    }
}

/**
 * @param { Player } player 
 * @param { CanvasRenderingContext2D } context 
 */
export function draw(player, context) {
    context.beginPath()
    context.fillRect(player.x, player.y, player.width, player.height)
    context.fill()
}