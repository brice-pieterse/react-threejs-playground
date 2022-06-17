import * as THREE from 'three'

import GarbageTracker from '../GarbageTracker';
import clearSceneGarbage from './clearSceneGarbage';

import renderText from './renderSceneUtils/renderText';
import renderGeometry from './renderSceneUtils/renderGeometry';

export default function renderScene(glRenderer, cssRenderer, threeScene, width, height, syncActiveSceneChange){

    const updateChild = (property, value, child) => {
        const updatedChild = {...child}
        updatedChild[property] = value
        syncActiveSceneChange('update child', updatedChild)
    }

    // dispose of all geometries, materials, textures, and renderLists
    const toRender = threeScene.scene
    clearSceneGarbage(glRenderer, toRender, GarbageTracker)
    
    // re-render scene children
    for (let c of threeScene.children){

        if (c.type === 'text'){

            const cssTextObject = renderText(c, width, height, updateChild)

            toRender.add(cssTextObject)
            GarbageTracker.addObject({type: 'Object3D', value: cssTextObject})
        }
        else if (c.type === 'geometry'){

            const geometryMesh = renderGeometry(c, width, height, updateChild)

            GarbageTracker.addObject({type: 'material', value: geometryMesh.material})
            GarbageTracker.addObject({type: 'geometry', value: geometryMesh.geometry})
            GarbageTracker.addObject({type: 'Object3D', value: geometryMesh})

            toRender.add(geometryMesh)

        }
    }

    // const torusGeometry = new THREE.TorusGeometry(width/4, width/50, 30, 200, Math.PI * 2)
    // const torusMaterial = new THREE.MeshNormalMaterial()
    // const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)

    // GarbageTracker.addObject({type: 'geometry', value: torusGeometry})
    // GarbageTracker.addObject({type: 'material', value: torusMaterial})
    // GarbageTracker.addObject({type: 'Object3D', value: torusMesh})

    // toRender.add(torusMesh)

    cssRenderer.render(toRender, threeScene.oCamera)
    glRenderer.render(toRender, threeScene.oCamera)
}