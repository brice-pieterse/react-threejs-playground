import React from 'react'
import TextControls from './textControls/TextControls'

import textChild from '../../assets/icons/textChild.svg'
import shaderChild from '../../assets/icons/shaderChild.svg'
import imageChild from '../../assets/icons/imageChild.svg'

export default function ActiveControls({ activeChild, syncActiveSceneChange}){

    const updateChild = (property, value) => {
        const updatedChild = {...activeChild}
        updatedChild[property] = value
        syncActiveSceneChange('update child', updatedChild)
    }

    return (
        <div className='active-control-menu'>
            <div className='divider dark float-left'></div>

                { activeChild.type == 'shader' && (
                    <div className='alignment base-horizontal base-left base-wide'>
                        <img src={shaderChild} style={{marginRight: '16px'}}></img>
                        <p>{`Shader ${activeChild.name}`}</p>
                    </div>
                )}

                { activeChild.type == 'text' && (
                    <div className='alignment base-horizontal base-left base-wide'>
                        <img src={textChild} style={{marginRight: '12px'}}></img>
                        <p>{activeChild.fontText}</p>
                    </div>
                )}

                { activeChild.type == 'image' && (
                    <div className='alignment base-horizontal base-left base-wide'>
                        <img src={imageChild} style={{marginRight: '12px'}}></img>
                        <p>{`Image ${activeChild.index}`}</p>
                    </div>
                )}


                { activeChild.type == 'text' && <TextControls updateChild={updateChild} activeChild={activeChild}/> }
        </div>
    )
}