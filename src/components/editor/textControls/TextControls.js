import React from 'react'

import { useFontSettingsCache } from '../../../contexts/FontSettingsCache'

import '../../../styles/Slider.css'
import '../../../styles/TextControls.css'

import leftAlignment from './assets/align-left.svg'
import centerAlignment from './assets/align-center.svg'
import rightAlignment from './assets/align-right.svg'

function FontSizeSelect({ updateFontSize, size }){
    return (
     <div className="slidecontainer">
        <input type="range" min="1" max="100" value={size * 100} className="slider" onChange={(e) => {
            updateFontSize(e.target.value)
        }}/>
    </div>
    )
}

function FontFamilySelect(){
    return (
        <select name="font-family-select" className='font-family-selector'>
            <option value="Inter">Inter</option>
        </select>
    )
}

function FontWeightSelect(){
    return (
        <select name="font-family-select" className='font-family-selector'>
            <option value="Inter">100</option>
        </select>
    )
}

function FontColorSelect({ defaultColor, setDefaultColor }) {
    return (
        <input style={{width: '65%'}} value={defaultColor} onChange={(e) => {}}></input>
    )
}

export default function TextControls({ updateChild, activeChild }){

    const fontSettings = useFontSettingsCache()

    const updateFontSize = (value) => {
        const updatedFontSize = (value * 1/100)
        updateChild('fontSize', updatedFontSize)
    }

    return <div className='alignment base-vertical base-wide base-margin-top-24'>
        <div className='text-control font-family'>
            <p className='small light'>Font</p>
            <div className='content-block base-variable base-large base-right '>
                <FontFamilySelect/>
            </div>
        </div>
        <div className='divider'></div>
        <div className='text-control font-weight'>
            <p className='small light'>Weight</p>
            <div className='content-block base-variable base-large base-right '>
                <FontWeightSelect/>
            </div>
        </div>
        <div className='divider'></div>
        <div className='text-control font-size'>
            <p className='small light'>Size</p>
            <div className='content-block base-variable base-large base-right '>
                <FontSizeSelect updateFontSize={updateFontSize} size={activeChild.fontSize}/>
            </div>
        </div>
        <div className='divider'></div>
        <div className='text-control font-color'>
            <p className='small light'>Color</p>
            <div className='content-block base-variable base-large base-right '>
                <FontColorSelect defaultColor={fontSettings.fontColor} setDefaultColor={fontSettings.setColor}/>
            </div>
        </div>
        <div className='divider'></div>
        <div className='text-control text-alignment'>
            <p className='small light'>Align</p>
            <div className='content-block base-variable base-large spread'>
                <div className='alignment base-vertical'>
                    <img src={leftAlignment}></img>
                </div>
                <div className='alignment base-vertical'>
                    <img src={centerAlignment}></img>
                </div>
                <div className='alignment base-vertical'>
                    <img src={rightAlignment}></img>
                </div>  
            </div>
        </div>
    </div>
}