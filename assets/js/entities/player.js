/**
 * @typedef { Object } Player
 * @property { number } x
 * @property { number } y
 * @property { number } width
 * @property { number } height
 * @property { number } speed
 * @property { number } dirX
 * @property { number } dirY
 */

/**
 * @param { number } x 
 * @param { number } y 
 * @param { number } width
 * @param { number } height 
 * @param { number } speed
 * @returns { Player }
 */
export function newPlayer(x, y, width, height, speed) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
        speed: speed,

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

/**
 * @param { Player } player 
 */
export function update(player) {
    player.x += player.dirX
    player.y += player.dirY
}

/**
 * @param { Player } player 
 */
export function moveLeft(player) {
    player.x += player.speed * -1
}

/**
 * @param { Player } player 
 */
export function moveRight(player) {
    player.x += player.speed
}