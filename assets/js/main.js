import { radToDeg } from "./math.js"
import { isHTMLCanvasElement } from "./type_guards.js"
import * as Game from "./game.js"

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

    const gameObjects = Game.init(canvas, context)

    canvas.addEventListener('mousemove', function(ev) {
        Game.onCanvasMouseMove(ev, gameObjects)
    })

    const clickController = new AbortController()
    canvas.addEventListener('click', (ev) => {
        Game.onCanvasClick(ev, gameObjects, clickController)
    }, { signal: clickController.signal })

    window.addEventListener('keyup', Game.onKeyUp)
    window.addEventListener('keydown', Game.onKeyDown)

    let lastFrameTime = 0
    const maxFPS = 30
    const timestep = 1000 / maxFPS

    /** @type { FrameRequestCallback } */
    const gameLoop = function(timestamp) {
        if (timestamp - lastFrameTime >= timestep) {
            lastFrameTime = timestamp

            Game.update(canvas, gameObjects)
            Game.render(canvas, context, gameObjects)
        }

        requestAnimationFrame(gameLoop)
    }

    requestAnimationFrame(gameLoop)
}

main()

/**
 * @param { HTMLCanvasElement } canvas 
 * @param { HTMLElement } container 
 * @param { number } aspectRatio 
 */
function resizeCanvas(canvas, container, aspectRatio) {
    canvas.width = container.clientWidth
    canvas.height = container.clientWidth * aspectRatio
}