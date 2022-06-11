import * as THREE from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

import GarbageTracker from '../GarbageTracker';
import clearSceneGarbage from './clearSceneGarbage';

export default function renderScene(glRenderer, cssRenderer, threeScene, canvasBounds){

    console.log(threeScene.oCamera)

    // TODO: only dispose of objects that have changed

    // dispose of all geometries, materials, textures, and renderLists
    const toRender = threeScene.scene
    clearSceneGarbage(glRenderer, toRender, GarbageTracker)
    
    // re-render scene children
    for (let c of threeScene.children){

        if (c.type === 'text'){
            console.log(c)
            const text = document.createElement('p')
            text.style.textAlign = c.fontAlignment
            text.style.color = c.color
            text.innerText = c.text
            // check if document.fonts already contains the font
            if (document.fonts.check(`12px ${c.fontFamily.font}`)){
                text.style.fontFamily = c.fontFamily.font
            }
            else {
                const newFont = new FontFace(c.fontFamily.font, `url(${c.fontFamily.file})`);

                newFont.load().then(function(loaded_face) {
                    document.fonts.add(loaded_face);
                    text.style.fontFamily = c.fontFamily.font
                }).catch(function(err) {
                    console.log("Error loading new font: ", err)
                });
            }
            // font weight
            text.style.fontWeight = c.fontWeight
            // font size needs to be dynamic such that it takes up % of canvas width
            text.style.opacity = 0
            text.style.fontSize = '12px'
            text.style.lineHeight = '12px'
            // first add it to the css scene wrapper and measure how much space it fills
            document.querySelector('.css3').appendChild(text)
            const targetWidth = c.fontSize * canvasBounds.width
            let fontSizer = 12
            while (text.clientWidth < targetWidth.width - 40){
                text.style.fontSize = `${fontSizer + 4}px`
                text.style.lineHeight = `${fontSizer + 4}px`
            }

            // font will be perfect size now
            document.querySelector('.css3').removeChild(text)
            text.style.opacity = 1

            const cssTextObject = new CSS3DObject(text);
            console.log("CSS3D",cssTextObject)

            toRender.add(cssTextObject)
            GarbageTracker.addObject({type: 'Object3D', value: cssTextObject})
        }
    }


    const torusGeometry = new THREE.TorusGeometry(canvasBounds.width/4, canvasBounds.width/50, 30, 200, Math.PI * 2)
    const torusMaterial = new THREE.MeshNormalMaterial()
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)

    GarbageTracker.addObject({type: 'geometry', value: torusGeometry})
    GarbageTracker.addObject({type: 'material', value: torusMaterial})
    GarbageTracker.addObject({type: 'Object3D', value: torusMesh})

    toRender.add(torusMesh)

    cssRenderer.render(toRender, threeScene.oCamera)
    glRenderer.render(toRender, threeScene.oCamera)
}