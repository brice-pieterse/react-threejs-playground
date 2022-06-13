export default function resizeScene(width, height, camera, glRenderer, cssRenderer){
    camera.left = width/2
    camera.right = -width/2
    camera.top = height/2
    camera.bottom = -height/2
    camera.updateProjectionMatrix()

    glRenderer.setSize(width, height)
    cssRenderer.setSize(width, height)
}