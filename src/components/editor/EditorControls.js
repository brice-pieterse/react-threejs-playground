import React from 'react'

// Assets
import pencil from '../../assets/icons/pencil.svg'
import textChild from '../../assets/icons/textChild.svg'
import shaderChild from '../../assets/icons/shaderChild.svg'
import imageChild from '../../assets/icons/imageChild.svg'
import torusChild from '../../assets/icons/geometries/torusChild.svg'
import trash from '../../assets/icons/trash.svg'


export default function EditorControls({ activeScene, activeChild, setActiveChild, syncActiveSceneChange }) {

    const activateChild = (c) => {
        setActiveChild(c)
    }

    const deleteChild = (c) => {
        syncActiveSceneChange('delete child', c)
    }

    return (
        <div className='editor-controls'>
            <div className='divider dark float-top'></div>
            <div className='divider'></div>
            <div className='alignment base-wide base-horizontal base-spread'>
                <input className='transparent wide base-side-padding-24 base-ends-padding-12' value={activeScene.name} onChange={() => {}}></input>
                <img className='pencil' src={pencil}></img>
                <div className='highlighter-line'></div>
            </div>
            <div className='alignment base-wide base-horizontal base-left base-left-padding-40 base-right-padding-24 base-ends-padding-8' style={{ backgroundColor: '#505356' }}>
                <p>Embed Controls</p>
            </div>
            {/* Embed Controls */}
            
            <div className='alignment base-vertical base-left base-left-padding-40 base-right-padding-24 base-ends-padding-8 base-margin-top-16 base-margin-bottom-16'>
                <p className='small'>Visualize your merlin embed by adjusting its parent wrapper aspect ratio:</p>
                <div className='alignment base-wide base-left base-margin-top-16 base-margin-bottom-24'>
                    <p className='small light base-margin-right-16'>Aspect (width/height)</p>
                    <select name="embed-aspect-select" id="aspect-select">
                        <option value="1:1">1:1</option>
                        <option value="3:2">3:2</option>
                        <option value="4:3">4:3</option>
                        <option value="16:9">16:9</option>
                        <option value="9:16">9:16</option>
                    </select>
                </div>
                <div className='divider'></div>
            </div>
            {/* Scene Controls */}
            <div className='alignment base-wide base-left base-left-padding-40 base-right-padding-24 base-ends-padding-8'>
                <p>Scene Controls</p>
            </div>
            {/* Scene Children */}
            <div className='alignment base-wide base-vertical base-left base-left-padding-40 base-right-padding-24 base-ends-padding-12'>
                <p className='small light'>Children</p>
                <div className='divider base-margin-top-8 base-margin-bottom-8'></div>

                {activeScene.children && activeScene.children.map((c) => {
                    if (c.type == 'shader') {
                        return <div key={c.index} className='alignment base-horizontal base-left base-wide child-wrapper'>

                        <div className={activeChild && c.index === activeChild.index ? 'child active': 'child'} onClick={() => activateChild(c)}>
                            <img src={shaderChild} className='child-icon'></img>
                            <p>{`Shader ${c.name}`}</p>
                        </div>

                        <div className={activeChild && c.index === activeChild.index ? 'delete-child active': 'delete-child'} onClick={() => deleteChild(c)}>
                            <img className='trash' src={trash}></img>
                        </div>

                        </div>
                    }
                    else if (c.type === 'image') {
                        return <div key={c.index} className='alignment base-horizontal base-left base-wide child-wrapper'>

                            <div className={activeChild && c.index === activeChild.index ? 'child active': 'child'} onClick={() => activateChild(c)}>
                                <img src={imageChild} className='child-icon'></img>
                                <p>{`Image ${c.index}`}</p>
                            </div>
            
                            <div className={activeChild && c.index === activeChild.index ? 'delete-child active': 'delete-child'} onClick={() => deleteChild(c)}>
                                <img className='trash' src={trash}></img>
                            </div>

                        </div>
                    }
                    else if (c.type === 'text') {
                        return <div key={c.index} className='alignment base-horizontal base-left base-wide child-wrapper'>

                            <div className={activeChild && c.index === activeChild.index ? 'child active': 'child'} onClick={() => activateChild(c)}>
                                <img src={textChild} className='child-icon'></img>
                                <p>{c.fontText}</p>
                            </div>

                            <div className={activeChild && c.index === activeChild.index ? 'delete-child active': 'delete-child'} onClick={() => deleteChild(c)}>
                                <img className='trash' src={trash}></img>
                            </div>

                        </div>
                    }
                    else if (c.type === 'geometry'){
                        return <div key={c.index} className='alignment base-horizontal base-left base-wide child-wrapper'>

                        <div className={activeChild && c.index === activeChild.index ? 'child active': 'child'} onClick={() => activateChild(c)}>
                            <img src={torusChild} className='child-icon'></img>
                            <p>{c.name}</p>
                        </div>

                        <div className={activeChild && c.index === activeChild.index ? 'delete-child active': 'delete-child'} onClick={() => deleteChild(c)}>
                             <img className='trash' src={trash}></img>
                        </div>

                        </div>
                    }
                })}
            </div>
        </div>
    )
}