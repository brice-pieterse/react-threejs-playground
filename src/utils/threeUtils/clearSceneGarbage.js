
export default function clearSceneGarbage(glRenderer, threeScene, GarbageTracker){
    GarbageTracker.clearGarbage(threeScene)
    glRenderer.renderLists.dispose();
}