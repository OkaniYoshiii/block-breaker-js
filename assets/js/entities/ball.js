/**
 * @typedef { Object } Ball
 * @property { number } x
 * @property { number } y
 * @property { number } radius
 * @property { number } dirX
 * @property { number } dirY
 */

/**
 * @param { number } x 
 * @param { number } y 
 * @param { number } radius 
 * @returns { Ball }
 */
export function newBall(x, y, radius) {
    return {
        x: x,
        y: y,
        radius: radius,

        dirX: 0,
        dirY: 0,
    }
}


/**
 * @param { Ball } ball 
 * @param { CanvasRenderingContext2D } context 
 */
export function draw(ball, context) {
    const fillStyle = context.fillStyle
    context.beginPath()
    context.fillStyle = 'red'
    context.ellipse(ball.x, ball.y, ball.radius, ball.radius, 0, 0, 360)
    context.fill()

    context.fillStyle = fillStyle
}

/**
 * @param { Ball } ball 
 */
export function update(ball) {
    ball.x += ball.dirX
    ball.y += ball.dirY
} 