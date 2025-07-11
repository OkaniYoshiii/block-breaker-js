/**
 * @typedef { Object } Circle
 * @property { number } x
 * @property { number } y
 * @property { number } radius
 */

/**
 * @typedef { Object } Rect
 * @property { number } x
 * @property { number } y
 * @property { number } width
 * @property { number } height
 */

export const EDGES = {
    NONE: 0,
    LEFT: 1 << 1,
    RIGHT: 1 << 2,
    TOP: 1 << 3,
    BOTTOM: 1 << 4,
}

export const CORNERS = {
    TOPLEFT: EDGES.TOP + EDGES.LEFT,
    TOPRIGHT: EDGES.TOP + EDGES.RIGHT,
    BOTTOMRIGHT: EDGES.BOTTOM + EDGES.RIGHT,
    BOTTOMLEFT: EDGES.BOTTOM + EDGES.LEFT,
}

/**
 * @param { Circle } circle 
 * @param { Rect } rect 
 * @returns { number }
 */
export function circleToRect(circle, rect) {
    let edge = EDGES.NONE

    if (!isCircleCollidingRect(circle, rect)) {
        return EDGES.NONE
    }

    // Le cercle touche le rectangle — identifier les côtés
    if(circle.x - circle.radius <= rect.x) {
        edge |= EDGES.LEFT
    }

    if(circle.x + circle.radius >= rect.x + rect.width) {
        edge |= EDGES.RIGHT
    }

    if(circle.y - circle.radius <= rect.y) {
        edge |= EDGES.TOP
    }

    if(circle.y + circle.radius >= rect.y + rect.height) {
        edge |= EDGES.BOTTOM
    }

    return edge
}

/**
 * @param { Circle } circle 
 * @param { Rect } rect 
 * @returns { boolean }
 */
export function isCircleCollidingRect(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width))
    const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height))

    const dx = circle.x - closestX
    const dy = circle.y - closestY
    const distanceSq = dx * dx + dy * dy

    if (distanceSq > circle.radius * circle.radius) {
        return false
    }

    return true
}


/**
 * @param { Circle } circle 
 * @param { HTMLCanvasElement } canvas 
 * @returns { number } - Edge that the circle is touching. 0 if not outside of canvas.
 */
export function circleOutsideOfCanvas(circle, canvas) {
    if(circle.x - circle.radius <= 0) {
        return EDGES.LEFT
    }

    if(circle.x + circle.radius >= canvas.width) {
        return EDGES.RIGHT
    }

    if(circle.y >= canvas.height - circle.radius) {
        return EDGES.BOTTOM
    }

    if(circle.y - circle.radius <= 0) {
        return EDGES.TOP
    }

    return EDGES.NONE
}