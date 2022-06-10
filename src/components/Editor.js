import React from 'react'
import '../styles/Editor.css'

// Utils
import createThreeScene from '../utils/threeUtils/createScene'

// Assets
import text from '../assets/icons/text.svg'

// Components
import ActiveControls from './editor/ActiveControls'
import EditorControls from './editor/EditorControls'
import EditorView from './editor/EditorView'

// Contexts
import FontSettingsProvider from '../contexts/FontSettingsCache'

function EditorNav({ activeControl, setActiveControl }) {

    return <div className='nav'>
        <img src='/assets/brand.png' className='brand'></img>

        {activeControl === 'text' ? <div className='control active'><img src={text} className='text'></img></div> : <div className='control' onClick={() => setActiveControl('text')}><img src={text} className='text'></img></div>}

        
    </div>
}

export default function Editor({ project }) {
    const [activeScene, setActiveScene] = React.useState(project.scenes ? project.scenes[0] : null)
    const projectScenes = React.useRef(project.scenes || [])
    const [activeControl, setActiveControl] = React.useState('')
    const [activeChild, setActiveChild] = React.useState()

    React.useEffect(() => {
        // new project if scenes array is empty
        if (projectScenes.current.length === 0) {
            const scene = createThreeScene([])
            scene.then(scene => {
                
                setActiveScene(scene)
                projectScenes.current = [scene]
            })
        }

    }, [])

    const syncActiveSceneChange = (action, value) => {
        const updatedActiveScene = {...activeScene}
        if (action === 'update child'){
            // swap out old child for updated child
            for (let i = 0; i < updatedActiveScene.children.length; i++){
                if (updatedActiveScene.children[i].index === value.index){
                    updatedActiveScene.children[i] = value
                }
            }
            setActiveChild(value)
        }
        else if (action === 'create text child'){
            updatedActiveScene.children.push(value)
            setActiveChild(value)
            setActiveControl(null)
        }
        // swap old old scene for updated scene
        const projectScenesCopy = [...projectScenes.current]
        for (let i = 0; i < projectScenesCopy.length; i++){
            if (projectScenesCopy[i].index === updatedActiveScene.index){
                projectScenesCopy[i] = updatedActiveScene
            }
        }
        projectScenes.current = projectScenesCopy
        setActiveScene(updatedActiveScene)
    }

    return (
        <div className='editor-main'>

            {/* <div style={{width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, backgroundColor: 'white', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', zIndex: 10}}>
                <p style={{color: 'black', fontSize: '100px'}}>Hey</p>
            </div> */}
            
                <EditorNav activeControl={activeControl} setActiveControl={setActiveControl}></EditorNav>

                <FontSettingsProvider>
        
                    <div className='editor-app'>

                        {/* Edit active scene */}
                        {activeScene && <EditorControls activeScene={activeScene} setActiveChild={setActiveChild} activeChild={activeChild}></EditorControls>}


                        {/* View active scene, toggle scenes, create scene */}
                        {activeScene && <EditorView projectScenes={projectScenes} activeScene={activeScene} setActiveScene={setActiveScene} activeControl={activeControl} syncActiveSceneChange={syncActiveSceneChange}>
                            
                            {/* Child controls */}
                            {activeChild && <ActiveControls activeChild={activeChild} syncActiveSceneChange={syncActiveSceneChange}/>}
                            
                        </EditorView>}

                    </div>

                </FontSettingsProvider>

        </div>
    );
}