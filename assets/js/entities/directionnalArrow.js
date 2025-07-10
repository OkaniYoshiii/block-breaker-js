/**
 * @typedef { Object } DirectionnalArrow
 * @property { {x: number, y: number } } origin
 * @property { number } length 
 * @property { number } thickness 
 * @property { number } gap 
 * @property { number } angle
 * @property { number } segments
 * @property { number } segmentsGap
 */

/**
 * @param { {x: number, y: number} } origin 
 * @param { number } length 
 * @param { number } thickness 
 * @param { number } gap 
 *
 * @returns { DirectionnalArrow }
 */
export function newDirectionnalArrow(origin, length, thickness, gap) {
    return {
        origin: origin,
        length: length,
        thickness: thickness,
        gap: gap,

        angle: 0,
        segments: 4,
        segmentsGap: 10,
    }
}

/**
 * @param { DirectionnalArrow } arrow 
 * @param { CanvasRenderingContext2D } context 
 */
export function draw(arrow, context) {
    const originalFill = context.fillStyle

    context.beginPath()
    context.fillStyle = 'red'

    for(let i = 0; i < arrow.segments; i++) {
        const angle = Math.PI / 180 * (arrow.angle - 90)
        const dist = (arrow.gap + arrow.length / 2) + i * (arrow.length + arrow.segmentsGap)
        const x = arrow.origin.x + Math.cos(angle) * dist
        const y = arrow.origin.y + Math.sin(angle) * dist

        const translateX = x
        const translateY = y
        context.translate(translateX, translateY)
        context.rotate(angle)
        context.translate(-translateX, -translateY)

        context.rect(x - arrow.length / 2 , y - arrow.thickness / 2, arrow.length, arrow.thickness)
        context.fill()
        context.setTransform(1, 0, 0, 1, 0, 0)
    }

    context.fillStyle = originalFill
}

/**
 * @param { CanvasRenderingContext2D } context
 * @param { number } x 
 * @param { number } y 
 */
function setRotationOrigin(context, x, y) {
}