import React from 'react'
import * as THREE from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// Utils
import getCanvasEmbedStyle from '../../utils/getCanvasEmbedStyle'
import renderScene from '../../utils/threeUtils/renderScene'

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
    const [GLRenderer, setGLRenderer] = React.useState()
    const [CSSRenderer, setCSSRenderer] = React.useState()
    const [canvasBounds, setCanvasBounds] = React.useState()
    const [sceneThumb, setSceneThumb] = React.useState(activeScene.thumb)
    const fontLoader = React.useRef()
    const fontSettings = useFontSettingsCache()
    

    // Initialize new THREE WebGLRenderer
    // Update Camera Aspect
    // Render activeScene's THREE scene and THREE camera
    React.useEffect(() => {
        if (GLRenderer){
            const width = webgl3Ref.current.clientWidth
            const height = webgl3Ref.current.clientHeight
            const aspect = width / height
            activeScene.camera.top = 1 * aspect
            activeScene.camera.bottom = -1 * aspect
            activeScene.camera.updateProjectionMatrix()

            GLRenderer.setSize(embedRef.current.clientWidth, embedRef.current.clientHeight)
            CSSRenderer.setSize(embedRef.current.clientWidth, embedRef.current.clientHeight)

            //activeScene.alpha.material.map.repeat.set(1, 1.45)
    
            renderScene(GLRenderer, CSSRenderer, activeScene.scene, activeScene.camera)

            if (!sceneThumb){
                const thumb = GLRenderer.domElement.toDataURL('image/png');
                activeScene.thumb = thumb
                setSceneThumb(thumb)
            }

            const onResize = () => {
                console.log("resize")
                setCanvasBounds({ width: viewBoundsRef.current.clientWidth, height: viewBoundsRef.current.clientHeight })
            }
    
            window.addEventListener('resize', onResize)
    
            return () => window.removeEventListener('resize', onResize)
        }
        else if (webgl3Ref.current) {

            const glRenderer = new THREE.WebGLRenderer({ canvas: webgl3Ref.current })

            const cssRenderer = new CSS3DRenderer({ element: css3Ref.current })

            glRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            setGLRenderer(glRenderer)
            setCSSRenderer(cssRenderer)
        }

    }, [GLRenderer, canvasBounds, activeScene])


    React.useEffect(() => {
        const width = viewBoundsRef.current.clientWidth
        const height = viewBoundsRef.current.clientHeight

        setCanvasBounds({ width, height })

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
            const posX = e.clientX
            const posY = e.clientY
            const child = {
                type: 'text',
                index: activeScene.children.reduce((acc, c) => (c.index >= acc ? c.index + 1 : acc), 1),
                posX /* from -1 to 1 */,
                posY /* from -1 to 1 */,
                text: 'Lorem ipsum',
                color: fontSettings.color,
                fontFamily: fontSettings.font,
                fontSize: fontSettings.fontSize,
                fontAlignment: fontSettings.fontAlignment
            }
            syncActiveSceneChange('create text child', child)
        }
    }

    return <div className='editor-view'>
        {/* Scene View */}

        <div className='alignment base-horizontal base-wide base-tall base-margin-bottom-24'>
        {/* Child controls if activeChild */}
            {children}

            <div className='editor-projector' ref={viewBoundsRef}>

                {/* Canvas size based on scene aspect ratio */}
                {canvasBounds &&  <div className='editor-embed' ref={embedRef} style={EmbedSizingFromAspect} onClick={onSceneClick}>
                    <div className='checkerboard'>
                        <img src={alpha} className='editor-checkers'></img>
                    </div>
                    <canvas className='webgl3' ref={webgl3Ref} style={ActiveControlCursor}></canvas>
                    <div className='css3' ref={css3Ref}></div>
                </div>}

            </div>

        </div>

        <p className='small center fade'>By default your scene will take up 100% of the embed parent. Scroll up or down to visualize how the embed will look in your site if a shader causes scroll effects.</p>

        {/* Scene Navigator */}
        <div className='editor-scene-nav'>

            <button className='create-new-scene'><img src={add}/></button>
            {projectScenes.current.map(s => 
                s === activeScene ?
                    <img className='scene-thumb active' src={sceneThumb} key={s.index}></img> :
                    <img className='scene-thumb' src={sceneThumb} key={s.index}></img>
            )}

        </div>

    </div>
}