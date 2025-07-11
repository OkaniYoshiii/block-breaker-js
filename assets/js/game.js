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

/**
 * @typedef { Object } UninitializedGame
 * @property { false } isInitialized
 * @property { {} } objects
 */

/**
 * @typedef { Object } InitializedGame
 * @property { true } isInitialized
 * @property { GameObjects } objects
 */

const controls = {
    leftPressed: false,
    rightPressed: false,
}

/** @type { UninitializedGame | InitializedGame } */
const game = {
    isInitialized: false,
    objects: {},
}

/**
 * @param { HTMLCanvasElement } canvas
 */
export function init(canvas) {
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

        const player = Player.newPlayer(x, y, 50, height, 10)
        player.isLocked = true

        return player
    }()

    const directionnalArrow = function() {
        const origin = {
            x: player.x + player.width / 2,
            y: player.y,
        }

        return DirectionnalArrow.newDirectionnalArrow(origin, 15, 5, player.height)
    }()

    const ball = Ball.newBall(player.x + player.width / 2, player.y, 5)

    const objects = {
        blocks: blocks,
        player: player,
        directionnalArrow: directionnalArrow,
        ball: ball,
    }

    game.isInitialized = true
    game.objects = objects
}

/**
 * @param { HTMLCanvasElement } canvas
 */
export function update(canvas) {
    if(!game.isInitialized) {
        return
    }

    if(controls.leftPressed) {
        Player.moveLeft(game.objects.player)
    }

    if(controls.rightPressed) {
        Player.moveRight(game.objects.player)
    }

    Ball.update(game.objects, canvas)
    Player.update(game.objects.player)
}

/**
 * @param { HTMLCanvasElement } canvas 
 * @param { CanvasRenderingContext2D } context
 */
export function render(canvas, context) {
    if(!game.isInitialized) {
        return
    }

    context.clearRect(0, 0, canvas.width, canvas.height)

    for(const block of game.objects.blocks) {
        Block.draw(block, context)
    }

    Player.draw(game.objects.player, context)

    DirectionnalArrow.draw(game.objects.directionnalArrow, context)

    Ball.draw(game.objects.ball, context)
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
 */
export function onCanvasClick(ev) {
    const currentTarget = ev.currentTarget 
    if(!isMouseEvent(ev) || !isHTMLCanvasElement(currentTarget) || !game.isInitialized) {
        return
    }

    const maxSpeed = 5

    const dx = ev.offsetX - game.objects.ball.x
    const dy = ev.offsetY - game.objects.ball.y

    const angle = Math.atan2(dy, dx)

    const angleDeg = angle * (180 / Math.PI) + 90
    if (angleDeg < -90 || angleDeg > 90) {
        return
    }

    const length = Math.sqrt(dx * dx + dy * dy)
    const normX = dx / length
    const normY = dy / length

    game.objects.ball.dirX = normX * maxSpeed
    game.objects.ball.dirY = normY * maxSpeed

    game.objects.player.isLocked = false
    game.objects.directionnalArrow.state = DirectionnalArrow.STATE.HIDDEN

    currentTarget.removeEventListener('click', onCanvasClick)
}

/**
 * @param { Event } ev 
 */
export function onCanvasMouseMove(ev) {
    if(!isMouseEvent(ev) || !game.isInitialized) {
        return
    }

    const directionnalArrow = game.objects.directionnalArrow
    const x = directionnalArrow.origin.x - ev.offsetX
    const y = directionnalArrow.origin.y - ev.offsetY
    const angle = radToDeg(-Math.atan2(x, y))

    game.objects.directionnalArrow.angle = angle
}