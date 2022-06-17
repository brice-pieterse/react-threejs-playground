import * as THREE from 'three'

export default function renderGeometry(c, width, height, updateChild){

    let material;
    let geometry;
    let geometryWidth = Math.ceil(c.width * width);

    if (c.geometry === 'torus'){
        geometry = new THREE.TorusGeometry(geometryWidth, width/20, 30, 200, Math.PI * 2)
    }

    if (c.material){
        // if we add shaders in the future
    }
    else material = new THREE.MeshNormalMaterial()

    return new THREE.Mesh(geometry, material)
}