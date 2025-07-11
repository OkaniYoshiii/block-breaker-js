import * as Player from "./entities/player.js"
import * as Block from "./entities/block.js"
import * as Ball from "./entities/ball.js"
import * as DirectionnalArrow from "./entities/directionnalArrow.js"
import { isHTMLCanvasElement, isKeyboardEvent, isMouseEvent } from "./type_guards.js"
import { radToDeg } from "./math.js"

/** @typedef { import('./entities/block.js').Block } Block */
/** @typedef { import("./entities/player.js").Player } Player */
/** @typedef { import("./entities/directionnalArrow.js").DirectionnalArrow } DirectionnalArrow */
/** @typedef { import("./entities/ball.js").Ball } Ball */

/**
 * @typedef { Object } GameObjects
 * @property { Block[] } blocks
 * @property { Player } player
 * @property { DirectionnalArrow } directionnalArrow
 * @property { Ball } ball
 */

const controls = {
    leftPressed: false,
    rightPressed: false,
}

/**
 * @param { HTMLCanvasElement } canvas
 * @param { CanvasRenderingContext2D } context
 */
export function init(canvas, context) {
    const aspectRatio = 9 / 16

    canvas.width = 500
    canvas.height = canvas.width * aspectRatio

    const blocks = function() {
        const blocksPerRow = 10
        const blocksPerColumn = 5
        const gap = 5
        const width = canvas.width / blocksPerRow - ((blocksPerRow - 1) * gap / blocksPerRow)
        const height = 100 / blocksPerColumn - ((blocksPerColumn - 1) * gap / blocksPerColumn)

        /** @type { Block[] } */
        const blocks = []
        for(let i = 0; i < blocksPerRow; i++) {
            for(let j = 0; j < blocksPerColumn; j++) {
                const block = Block.newBlock(i * width + gap * i, j * height + gap * j, width, height)

                blocks.push(block)
            }
        }

        return blocks
    }()

    const player = function() {
        const height = 10
        const width = 50
        const x = canvas.width / 2 - width / 2
        const y = canvas.height - height

        return Player.newPlayer(x, y, 50, height, 10)
    }()

    const directionnalArrow = function() {
        const origin = {
            x: player.x + player.width / 2,
            y: player.y,
        }

        return DirectionnalArrow.newDirectionnalArrow(origin, 15, 5, player.height)
    }()

    const ball = Ball.newBall(player.x + player.width / 2, player.y, 5)

    return {
        blocks: blocks,
        player: player,
        directionnalArrow: directionnalArrow,
        ball: ball,
    }
}

/**
 * @param { HTMLCanvasElement } canvas
 * @param { GameObjects } gameObjects
 */
export function update(canvas, gameObjects) {
    if(controls.leftPressed) {
        Player.moveLeft(gameObjects.player)
    }

    if(controls.rightPressed) {
        Player.moveRight(gameObjects.player)
    }

    Ball.update(gameObjects, canvas)
    Player.update(gameObjects.player)
}

/**
 * @param { HTMLCanvasElement } canvas 
 * @param { CanvasRenderingContext2D } context
 * @param { GameObjects } gameObjects
 */
export function render(canvas, context, gameObjects) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    for(const block of gameObjects.blocks) {
        Block.draw(block, context)
    }

    Player.draw(gameObjects.player, context)

    DirectionnalArrow.draw(gameObjects.directionnalArrow, context)

    Ball.draw(gameObjects.ball, context)
}

/**
 * @param { Event } ev 
 */
export function onKeyDown(ev) {
    if(!isKeyboardEvent(ev)) {
        return
    }

    const key = ev.key

    switch(key) {
        case 'ArrowLeft':
            controls.leftPressed = true
            break;
        case 'ArrowRight':
            controls.rightPressed = true
            break;
    }
}

/**
 * @param { Event } ev 
 */
export function onKeyUp(ev) {
    if(!isKeyboardEvent(ev)) {
        return
    }
    const key = ev.key

    switch(key) {
        case 'ArrowLeft':
            controls.leftPressed = false
            break;
        case 'ArrowRight':
            controls.rightPressed = false
            break;
    }
}

/**
 * @param { Event } ev 
 * @param { GameObjects } gameObjects 
 * @param { AbortController } abortController
 */
export function onCanvasClick(ev, gameObjects, abortController) {
    const currentTarget = ev.currentTarget 
    if(!isMouseEvent(ev) || !isHTMLCanvasElement(currentTarget)) {
        return
    }

    const maxSpeed = 5

    const dx = ev.offsetX - gameObjects.ball.x
    const dy = ev.offsetY - gameObjects.ball.y

    const angle = Math.atan2(dy, dx)

    const angleDeg = angle * (180 / Math.PI) + 90
    if (angleDeg < -90 || angleDeg > 90) {
        return
    }

    const length = Math.sqrt(dx * dx + dy * dy)
    const normX = dx / length
    const normY = dy / length

    gameObjects.ball.dirX = normX * maxSpeed
    gameObjects.ball.dirY = normY * maxSpeed

    abortController.abort()
}

/**
 * @param { Event } ev 
 * @param { GameObjects } gameObjects 
 */
export function onCanvasMouseMove(ev, gameObjects) {
    if(!isMouseEvent(ev)) {
        return
    }

    const directionnalArrow = gameObjects.directionnalArrow
    const x = directionnalArrow.origin.x - ev.offsetX
    const y = directionnalArrow.origin.y - ev.offsetY
    const angle = radToDeg(-Math.atan2(x, y))

    gameObjects.directionnalArrow.angle = angle
}