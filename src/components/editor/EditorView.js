import React from 'react'
import * as THREE from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// Utils
import getCanvasEmbedStyle from '../../utils/getCanvasEmbedStyle'
import renderScene from '../../utils/threeUtils/renderScene'
import resizeScene from '../../utils/threeUtils/resizeScene';
import createTextChild from '../../utils/editorUtils/createTextChild';
import getCanvasClickCoords from '../../utils/editorUtils/getCanvasClickCoords';

// Assets
import alpha from '../../assets/alpha.jpg'
import add from '../../assets/icons/add.svg'

// Contexts
import {useFontSettingsCache} from '../../contexts/FontSettingsCache'


// initializes threejs renderer for rendering project scenes
export default function EditorView({ projectScenes, activeScene, activeControl, syncActiveSceneChange, children }) {
    // renderer domElements
    const webgl3Ref = React.useRef();
    const css3Ref = React.useRef();

    const viewBoundsRef = React.useRef()
    const embedRef = React.useRef()

    const [glRenderer, setGLRenderer] = React.useState()
    const [cssRenderer, setCSSRenderer] = React.useState()

    const [canvasBounds, setCanvasBounds] = React.useState()
    const fontSettings = useFontSettingsCache()
    
    React.useEffect(() => {

        if (glRenderer && activeScene.needsUpdate){
            const width = webgl3Ref.current.clientWidth
            const height = webgl3Ref.current.clientHeight

            resizeScene(width, height, activeScene.oCamera, glRenderer, cssRenderer)

            renderScene(glRenderer, cssRenderer, activeScene, width, height, syncActiveSceneChange)

            const thumb = glRenderer.domElement.toDataURL('image/png');

            syncActiveSceneChange('needsUpdate', thumb)
        }

    }, [glRenderer, activeScene])


    const resize = () => {
        const width = viewBoundsRef.current.clientWidth
        const height = viewBoundsRef.current.clientHeight
        setCanvasBounds({ width, height })
        syncActiveSceneChange('toggle needsUpdate', true)
    }

    // set up
    React.useEffect(() => {
        const glRenderer = new THREE.WebGLRenderer({ canvas: webgl3Ref.current, autoClear: true, alpha: true })
        glRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        glRenderer.autoClear = true

        const cssRenderer = new CSS3DRenderer({ element: css3Ref.current })

        setGLRenderer(glRenderer)
        setCSSRenderer(cssRenderer)
        resize()

        const ro = new ResizeObserver(e => resize())
        ro.observe(viewBoundsRef.current)

        return () => ro.disconnect()
    }, [])


    const EmbedSizingFromAspect = React.useMemo(() => canvasBounds ? getCanvasEmbedStyle(activeScene, canvasBounds) : null, [canvasBounds])

    const ActiveControlCursor = React.useMemo(() => {
        if (activeControl === 'text'){
            return {cursor: 'text'}
        }
        return {cursor: 'crossHair'}
    }, [activeControl])

    const onSceneClick = (e) => {
        if (activeControl === 'text'){
            // get click position on canvas and translate to position for THREE.Text
            const { posX, posY } = getCanvasClickCoords(e.clientX, e.clientY, embedRef.current.getBoundingClientRect())
            console.log(posX, posY)
            const index = activeScene.children.reduce((acc, c) => (c.index >= acc ? c.index + 1 : acc), 1)
            const child = createTextChild(fontSettings, index, posX, posY)
            syncActiveSceneChange('create child', child)
        }
    }

    return <div className='editor-view'>
        {/* Scene View */}

        <div className='alignment base-horizontal base-wide base-tall base-margin-bottom-24'>
        {/* Child controls if activeChild */}
            {children}

            <div className='editor-projector' ref={viewBoundsRef}>

                {!canvasBounds && <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>Loading</div>}
                {/* Canvas size based on scene aspect ratio */}
                <div className='editor-embed' ref={embedRef} style={EmbedSizingFromAspect} onClick={onSceneClick}>
                    <div className='checkerboard'>
                        <img src={alpha} className='editor-checkers'></img>
                    </div>
                    <canvas className='webgl3' ref={webgl3Ref} style={ActiveControlCursor}></canvas>
                    <div className='css3' ref={css3Ref} style={ActiveControlCursor}></div>
                </div>

            </div>

        </div>

        <p className='small center fade'>By default your scene will take up 100% of the embed parent. Scroll up or down to visualize how the embed will look in your site if a shader causes scroll effects.</p>

        {/* Scene Navigator */}
        <div className='editor-scene-nav'>

            <button className='create-new-scene'><img src={add}/></button>
            {projectScenes.current.map(s => 
                s === activeScene ?
                    <img className='scene-thumb active' src={s.thumb} key={s.index}></img> :
                    <img className='scene-thumb' src={s.thumb} key={s.index}></img>
            )}

        </div>

    </div>
}