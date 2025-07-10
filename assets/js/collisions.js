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
    LEFT: 1,
    RIGHT: 2,
    TOP: 3,
    BOTTOM: 4,
}

/**
 * @param { Circle } circle 
 * @param { Rect } rect 
 * @returns { boolean }
 */
export function circleToRect(circle, rect) {
    const circleDistance = {
        x: Math.abs(circle.x - rect.x),
        y: Math.abs(circle.y - rect.y),
    }

    if (circleDistance.x > (rect.width/2 + circle.radius)) { return false; }
    if (circleDistance.y > (rect.height/2 + circle.radius)) { return false; }

    if (circleDistance.x <= (rect.width/2)) { return true; } 
    if (circleDistance.y <= (rect.height/2)) { return true; }

    const cornerDistanceSquared = (circleDistance.x - rect.width/2)^2 + (circleDistance.y - rect.height/2)^2;

    return (cornerDistanceSquared <= (circle.radius^2));
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