/**
 * @typedef { Object } Ball
 * @property { number } x
 * @property { number } y
 * @property { number } radius
 */

/**
 * @param { number } x 
 * @param { number } y 
 * @param { number } radius 
 * @returns 
 */
export function newBall(x, y, radius) {
    return {
        x: x,
        y: y,
        radius: radius,
    }
}

/**
 * @param { Ball } ball 
 * @param { CanvasRenderingContext2D } context 
 */
export function draw(ball, context) {
    context.beginPath()
    context.ellipse(ball.x, ball.y, ball.radius, ball.radius, 0, 0, 360)
    context.fill()
}