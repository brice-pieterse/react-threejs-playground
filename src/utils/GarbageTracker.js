class GarbageTracker {
    constructor(){
        this.tracking = []
    }

    addObject(o){
        this.tracking.push(o)
    }

    clearGarbage(scene){
        for (let o of this.tracking){
            if (o.type === 'geometry' || o.type === 'material' || o.type === 'texture'){
                o.value.dispose()
            }
            else if (o.type === 'Object3D'){
                scene.remove(o.value)
            }
        }
        this.tracking = []
    }
}

export default new GarbageTracker()