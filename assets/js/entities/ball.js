import * as Collisions from "../collisions.js"

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
 * @param { import("../game.js").GameObjects } gameObjects
 * @param { HTMLCanvasElement } canvas
 */
export function update(gameObjects, canvas) {
    // Anticipate collision
    gameObjects.ball.x += gameObjects.ball.dirX
    gameObjects.ball.y += gameObjects.ball.dirY
    const collisionEdge = Collisions.circleOutsideOfCanvas(gameObjects.ball, canvas)

    // Reset position
    gameObjects.ball.x -= gameObjects.ball.dirX
    gameObjects.ball.y -= gameObjects.ball.dirY

    switch(collisionEdge) {
        case Collisions.EDGES.LEFT:
        case Collisions.EDGES.RIGHT:
            gameObjects.ball.dirX *= -1
            break;
        case Collisions.EDGES.TOP:
        case Collisions.EDGES.BOTTOM:
            gameObjects.ball.dirY *= -1
            break;
    }

    gameObjects.ball.x += gameObjects.ball.dirX
    gameObjects.ball.y += gameObjects.ball.dirY
} 