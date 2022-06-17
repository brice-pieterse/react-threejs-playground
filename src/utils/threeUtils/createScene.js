import * as THREE from 'three'
import alpha from '../../assets/alpha.jpg'

// create new THREE scene
export default function createThreeScene(scenes){
    // initial aspect ratio is 1:1
    let highestIndex = 1;
    for (let s of scenes){
        if (s.index > highestIndex){
            highestIndex = s.index
        }
    }
    const loader = new THREE.TextureLoader()

    return new Promise((res, rej) => {
        loader.load(alpha, (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            const scene = new THREE.Scene()
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
            scene.add(camera)
            camera.position.z = 2

            res({
                name: `Scene ${highestIndex}`,
                index: highestIndex,
                oCamera: camera,
                scene: scene,
                aspect: '1:1',
                thumb: null,
                children: [
                    {type: 'geometry', index: 1, name: 'Merlin Torus', geometry: 'torus', width: 0.25}
                ],
                // triggers first render
                needsUpdate: true
            })
        })
    })
}