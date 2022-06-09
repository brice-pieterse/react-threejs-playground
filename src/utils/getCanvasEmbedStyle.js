export default function getCanvasEmbedStyle(scene, canvasBounds){
    if (!canvasBounds){
        return {
            width: `0px`,
            height: `0px`
        }
    }
    if (scene.aspect == '1:1'){
        if (canvasBounds.width >= canvasBounds.height){
            return {
                width: `${canvasBounds.height - 20}px`,
                height: `${canvasBounds.height - 20}px`
            }
        }
        return {
            width: `${canvasBounds.width - 20}px`,
            height: `${canvasBounds.width - 20}px`
        }
    }
    else if (scene.aspect == '3:2'){
        if (canvasBounds.width >= canvasBounds.height){
            return {
                width: `${canvasBounds.height - 20}px`,
                height: `${(canvasBounds.height - 20) * 2/3}px`
            }
        }
        return {
            width: `${canvasBounds.width - 20}px`,
            height: `${(canvasBounds.width - 20) * 2/3}px`
        }
    }
    else if (scene.aspect == '4:3'){
        if (canvasBounds.width >= canvasBounds.height){
            return {
                width: `${canvasBounds.height - 20}px`,
                height: `${(canvasBounds.height - 20) * 3/4}px`
            }
        }
        return {
            width: `${canvasBounds.width - 20}px`,
            height: `${(canvasBounds.width - 20) * 3/4}px`
        }
    }
    else if (scene.aspect == '16:9'){
        if (canvasBounds.width >= canvasBounds.height){
            return {
                width: `${canvasBounds.height - 20}px`,
                height: `${(canvasBounds.height - 20) * 9/16}px`
            }
        }
        return {
            width: `${canvasBounds.width - 20}px`,
            height: `${(canvasBounds.width - 20) * 9/16}px`
        }
    }
    // mobile
    else if (scene.aspect == '9:16'){
        if (canvasBounds.width >= canvasBounds.height){
            return {
                width: `${(canvasBounds.height - 20) * 9/16}px`,
                height: `${(canvasBounds.height - 20)}px`
            }
        }
        return {
            width: `${(canvasBounds.width - 20) * 9/16}px`,
            height: `${(canvasBounds.width - 20)}px`
        }
    }
}