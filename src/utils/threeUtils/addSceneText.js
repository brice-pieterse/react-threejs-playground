import React from 'react'
import THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

export default function addSceneText(scene, position, fontLoader){
    let ftLoader = fontLoader.current
    if (!ftLoader){
        ftLoader = new FontLoader()
        fontLoader.current = ftLoader
    }

    // eventually we need to add text to the scene, return an updated active scene object with child text data containing text settings

    // scene.children.push({
    //     type: 'text',
    //     element: // THREE.TextMesh ,
    //     settings: // Text settings for this element{

    //     }
    // })
    
    return scene
}