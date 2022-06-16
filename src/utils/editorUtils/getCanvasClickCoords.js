export default function getCanvasClickCoords(eX, eY, canvasBounding){
    let pos = {}
    const canvasWidth = canvasBounding.right - canvasBounding.x
    const halfWidth = canvasWidth/2

    const canvasHeight = canvasBounding.bottom - canvasBounding.y
    const halfHeight = canvasHeight/2

    const canvasLeftX = canvasBounding.x
    const canvasTopY = canvasBounding.y
    const canvasClick = {x: eX, y: eY}

    const longitude =  canvasClick.x - canvasLeftX

    const latitude = canvasClick.y - canvasTopY

    // in first half
    if (longitude <= halfWidth){
        const percent = 1 - (longitude/halfWidth)
        pos.posX = percent * -1
    }
    // in second half
    else if (longitude > halfWidth){
        const percent = (longitude - halfWidth)/halfWidth
        pos.posX = percent
    }

    if (latitude <= halfHeight){
        const percent = 1 - (latitude/halfHeight)
        pos.posY = percent * 1
    }
    else if (latitude > halfHeight){
        const percent = (latitude - halfHeight)/halfHeight
        pos.posY = percent * -1
    }

    return pos
}