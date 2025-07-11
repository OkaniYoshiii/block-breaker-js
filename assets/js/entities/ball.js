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

    {
        const ball = gameObjects.ball
        const player = gameObjects.player
        const edge = Collisions.circleToRect(ball, player)

        // Edge collision
        switch(edge) {
            case Collisions.CORNERS.TOPLEFT:
                // Direction: bottomLeft
                if(ball.dirX < 0 && ball.dirY > 0) {
                    ball.dirY *= -1
                }

                // Direction: topRight
                if(ball.dirX > 0 && ball.dirY < 0) {
                    ball.dirX *= -1
                }

                // Direction: bottomRight
                if(ball.dirX > 0 && ball.dirY < 0) {
                    const dx = player.x - ball.x
                    const dy = player.y - ball.y

                    if(dy < dx) {
                        ball.dirX *= -1
                    }

                    if(dy > dx) {
                        ball.dirY *= -1
                    }

                    if(dy === dx) {
                        ball.dirX *= -1
                        ball.dirY *= -1
                    }
                }
                // Balle remonte

                // Balle part à gauche

                // Balle repart dans le sens inverse
                console.log('Top left corner', ball.dirX, ball.dirY)
                break;
            case Collisions.CORNERS.TOPRIGHT:
                console.log('Top right corner')
                break;
            case Collisions.CORNERS.BOTTOMRIGHT:
                console.log('Bottom left corner')
                break;
            case Collisions.CORNERS.BOTTOMLEFT:
                console.log('Bottom right corner')
                break;
            case Collisions.EDGES.TOP:
                ball.dirY = Math.abs(ball.dirY) * (-1)
                break;
            case Collisions.EDGES.LEFT:
                ball.dirX = Math.abs(ball.dirX) * (-1)
                break;
            case Collisions.EDGES.RIGHT:
                ball.dirX = Math.abs(ball.dirX)
                break;
        }
    }

    gameObjects.ball.x += gameObjects.ball.dirX
    gameObjects.ball.y += gameObjects.ball.dirY
} 