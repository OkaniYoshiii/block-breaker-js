import * as Ball from "./entities/ball.js"
import * as Block from "./entities/block.js"
import { isHTMLCanvasElement } from "./type_guards.js"

/** @typedef { import('./entities/block.js').Block } Block */
/** @typedef { import("./entities/ball.js").Ball } Ball */

/**
 * @typedef { Object } GameObjects
 * @property { Block[] } blocks
 * @property { Ball } ball
 */

const canvas = document.getElementById('game')

function main() {
    if(!isHTMLCanvasElement(canvas)) {
        console.error('Canvas is not an HTMLCanvasElement')
        return
    }

    const context = canvas.getContext('2d')

    if(context === null) {
        return
    }

    const aspectRatio = 9 / 16
    const container = document.body
    
    resizeCanvas(canvas, container, aspectRatio)
    // Remove all things from canvas, do't knwo why
    // window.addEventListener('resize', () => resizeCanvas(canvas, container, aspectRatio))

    const gameObjects = init(canvas, context)

    let lastFrameTime = 0
    const maxFPS = 30
    const timestep = 1000 / maxFPS

    /** @type { FrameRequestCallback } */
    const gameLoop = function(timestamp) {
        if (timestamp - lastFrameTime >= timestep) {
            lastFrameTime = timestamp

            update(canvas, context, gameObjects)
            render()
        }

        requestAnimationFrame(gameLoop)
    }

    requestAnimationFrame(gameLoop)
}

main()

/**
 * @param { HTMLCanvasElement } canvas
 * @param { CanvasRenderingContext2D } context
 */
function init(canvas, context) {
    const aspectRatio = 9 / 16

    canvas.width = 500
    canvas.height = canvas.width * aspectRatio

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

    const radius = 10
    const x = canvas.width / 2
    const y = canvas.height - radius
    const ball = Ball.newBall(x, y, radius)

    return {
        blocks: blocks,
        ball: ball,
    }
}

/**
 * @param { HTMLCanvasElement } canvas 
 * @param { CanvasRenderingContext2D } context
 * @param { GameObjects } gameObjects
 */
function update(canvas, context, gameObjects) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    for(const block of gameObjects.blocks) {
        Block.draw(block, context)
    }

    Ball.draw(gameObjects.ball, context)
}

function render() {
}


/**
 * @param { HTMLCanvasElement } canvas 
 * @param { HTMLElement } container 
 * @param { number } aspectRatio 
 */
function resizeCanvas(canvas, container, aspectRatio) {
    canvas.width = container.clientWidth
    canvas.height = container.clientWidth * aspectRatio
}