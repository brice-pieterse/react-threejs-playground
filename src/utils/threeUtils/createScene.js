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
            //const alphaMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2, 2, 2), new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, opacity: 0.25, transparent: true }))
            //alphaMesh.position.z = 1
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
            scene.add(camera)
            //scene.add(alphaMesh)
            camera.position.z = 2

            res({
                name: `Scene ${highestIndex}`,
                index: highestIndex,
                oCamera: camera,
                scene: scene,
                aspect: '1:1',
                thumb: null,
                //alpha: alphaMesh,
                children: []
            })
        })
    })
}