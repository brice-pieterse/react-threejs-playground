import * as THREE from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

import GarbageTracker from '../GarbageTracker';
import clearSceneGarbage from './clearSceneGarbage';

export default function renderScene(glRenderer, cssRenderer, threeScene, width, height, syncActiveSceneChange){

    let changeTimeout;

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
            const text = document.createElement('p')
            // sync text updates
            text.oninput = (e) => {
                if (changeTimeout){
                    window.clearTimeout(changeTimeout)
                }
                changeTimeout = setTimeout(() => {
                    updateChild('fontText', e.target.innerText, c)
                }, 1000)
            }
            text.style.position = 'absolute'

            if (c.posX > 0){
                text.style.left = `${Math.ceil(c.posX * width/2)}px`
            }
            else {
                text.style.left = `${Math.ceil(c.posX * width/2)}px`
            }

            if (c.posY > 0){
                text.style.top = `${Math.ceil(c.posY * height/2)}px`
            }
            else {
                text.style.top = `${Math.ceil(c.posY * height/2)}px`
            }

            text.style.textAlign = c.fontAlignment
            text.style.color = c.fontColor
            text.innerText = c.fontText
            // check if document.fonts already contains the font
            if (document.fonts.check(`12px ${c.fontFamily.font}`)){
                text.style.fontFamily = c.fontFamily.font
            }
            else {
                const newFont = new FontFace(`${c.fontFamily.font} ${c.fontWeight}`, `url(${c.fontFamily.variants[c.fontWeight]})`);
                newFont.load()
                .then((loaded_face) => {
                    document.fonts.add(loaded_face);
                    text.style.fontFamily = loaded_face.family
                })

            }
            text.setAttribute('contenteditable', '')
            // font weight
            text.style.fontWeight = c.fontWeight
            // font size needs to be dynamic such that it takes up % of canvas width
            text.style.opacity = 0
            text.style.fontSize = '0px'
            text.style.display = 'inline-block'
            text.style.lineHeight = '0px'
            // first add it to the css scene wrapper and measure how much space it fills
            document.querySelector('.css3').appendChild(text)
            const targetWidth = c.fontSize * width
            let fontSizer = 0

            while (text.clientWidth < targetWidth - 40){
                text.style.fontSize = `${fontSizer + 4}px`
                text.style.lineHeight = `${fontSizer + 4}px`
                fontSizer += 4
            }

            // font will be perfect size now
            document.querySelector('.css3').removeChild(text)
            text.style.opacity = 1

            const cssTextObject = new CSS3DObject(text);

            toRender.add(cssTextObject)
            GarbageTracker.addObject({type: 'Object3D', value: cssTextObject})
        }
    }

    const torusGeometry = new THREE.TorusGeometry(width/4, width/50, 30, 200, Math.PI * 2)
    const torusMaterial = new THREE.MeshNormalMaterial()
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial)

    GarbageTracker.addObject({type: 'geometry', value: torusGeometry})
    GarbageTracker.addObject({type: 'material', value: torusMaterial})
    GarbageTracker.addObject({type: 'Object3D', value: torusMesh})

    toRender.add(torusMesh)

    cssRenderer.render(toRender, threeScene.oCamera)
    glRenderer.render(toRender, threeScene.oCamera)
}