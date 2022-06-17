import React from 'react'

import { useFontSettingsCache } from '../../../contexts/FontSettingsCache'

import '../../../styles/Slider.css'
import '../../../styles/TextControls.css'

import leftAlignment from './assets/align-left.svg'
import centerAlignment from './assets/align-center.svg'
import rightAlignment from './assets/align-right.svg'
import leftAlignmentActive from './assets/align-left_active.svg'
import centerAlignmentActive from './assets/align-center_active.svg'
import rightAlignmentActive from './assets/align-right_active.svg'


function FontSizeSelect({ updateFontSize, size }){

    const updateTimer = React.useRef();

    // used to avoid excessive rerendering
    const timeUpdateFontSize = (value) => {
        if (updateTimer.current){
            window.clearTimeout(updateTimer.current)
        }
        const newTimer = window.setTimeout(() => {
            updateFontSize(value)
        }, 250)

        updateTimer.current = newTimer
    }

    return (
     <div className="slidecontainer">
        <input type="range" min="1" max="100" defaultValue={size * 100} className="slider" onChange={(e) => {
            timeUpdateFontSize(e.target.value)
        }}/>
    </div>
    )
}


function FontFamilySelect({ library, family, updateFontFamily }){

    const findFamilyToUpdate = (name) => {
        let i = 0;
        while (i < library.length){
            if (library[i].font === name){
                updateFontFamily(library[i])
                break
            }
            i++;
        }
    }

    return (
        <select name="font-family-select" className='font-family-selector' onChange={(e) => findFamilyToUpdate(e.target.value)} defaultValue={family.font}>
            { library.map(f => <option key={f.id} value={f.font}>{f.font}</option>)} 
        </select>
    )
}

function FontWeightSelect({ fontFamily, fontWeight, updateFontWeight }){
    return (
        <select name="font-family-select" className='font-family-selector' onChange={(e) => updateFontWeight(e.target.value)} defaultValue={fontWeight}>
            {Object.keys(fontFamily.variants).map(v => {
                return <option key={v} value={v}>{v}</option>
            })}
        </select>
    )
}

function FontColorSelect({ color, updateFontColor }) {

    const updateTimer = React.useRef();

    // used to avoid excessive rerendering
    const timeUpdateFontColor = (value) => {
        if (updateTimer.current){
            window.clearTimeout(updateTimer.current)
        }
        const newTimer = window.setTimeout(() => {
            updateFontColor(value)
        }, 750)

        updateTimer.current = newTimer
    }

    return (
        <input style={{width: '65%'}} defaultValue={color} onChange={(e) => {timeUpdateFontColor(e.target.value)}}></input>
    )
}

const FontAlignmentSelect = ({ alignment, updateAlignment }) => {

    const toggleAlignment = (value) => {
        if (value != alignment){
            updateAlignment(value)
        }
    }

    return (
        <div className='text-control text-alignment'>
            <p className='small light'>Align</p>
            <div className='content-block base-variable base-large spread'>
                <div className='alignment base-vertical'>
                    <img src={alignment === 'left' ? leftAlignmentActive : leftAlignment} onClick={(e) => toggleAlignment('left')}></img>
                </div>
                <div className='alignment base-vertical'>
                    <img src={alignment === 'center' ? centerAlignmentActive : centerAlignment} onClick={(e) => toggleAlignment('center')}></img>
                </div>
                <div className='alignment base-vertical'>
                    <img src={alignment === 'right' ? rightAlignmentActive : rightAlignment}
                    onClick={(e) => toggleAlignment('right')}></img>
                </div>  
            </div>
        </div>
    )
}

function FontAxisSelect({ updateFontAxis, axis, pos }){

    const updateTimer = React.useRef();

    // used to avoid excessive rerendering
    const timeUpdateFontAxis = (value) => {
        if (updateTimer.current){
            window.clearTimeout(updateTimer.current)
        }
        const newTimer = window.setTimeout(() => {
            updateFontAxis(value, axis)
        }, 250)

        updateTimer.current = newTimer
    }

    return (
     <div className="slidecontainer">
        <input type="range" min="-100" max="100" defaultValue={pos * 100} className="slider" onChange={(e) => {
            timeUpdateFontAxis(e.target.value)
        }}/>
    </div>
    )
}

export default function TextControls({ updateChild, activeChild }){

    const fontSettings = useFontSettingsCache()

    const updateFontFamily = (value) => {
        console.log(value)
        updateChild('fontFamily', value)
        fontSettings.updateDefaultFontFamily(value) // updates default settings
    }

    const updateFontWeight = (value) => {
        updateChild('fontWeight', value)
    }

    const updateFontSize = (value) => {
        const updatedFontSize = (value * 1/100)
        updateChild('fontSize', updatedFontSize)
        fontSettings.setFontSize(updatedFontSize) // updates default settings
    }

    const updateFontColor = (value) => {
        updateChild('fontColor', value)
        fontSettings.setFontColor(value) // updates default settings
    }

    const updateFontAlignment = (value) => {
        updateChild('fontAlignment', value)
        fontSettings.setFontAlignment(value) // updates default settings
    }

    const updateFontAxis = (value, axis) => {
        const updatedAxisValue = (value * 1/100)
        updateChild(axis, updatedAxisValue)
        fontSettings.setFontAlignment(value) // updates default settings
    }

    return <div className='alignment base-vertical base-wide base-margin-top-24'>
        <div className='text-control font-family'>
            <p className='small light'>Font</p>
            <div className='content-block base-variable base-large base-right '>
                <FontFamilySelect updateFontFamily={updateFontFamily} library={fontSettings.fontLibrary} family={activeChild.fontFamily}/>
            </div>
        </div>
        <div className='divider'></div>
        <div className='text-control font-weight'>
            <p className='small light'>Weight</p>
            <div className='content-block base-variable base-large base-right '>
                <FontWeightSelect updateFontWeight={updateFontWeight} fontFamily={activeChild.fontFamily} fontWeight={activeChild.fontWeight}/>
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
                <FontColorSelect color={activeChild.fontColor} updateFontColor={updateFontColor}/>
            </div>
        </div>
        <div className='divider'></div>
        <FontAlignmentSelect alignment={activeChild.fontAlignment} updateAlignment={updateFontAlignment}/>
        <div className='divider'></div>
        <div className='text-control font-size'>
            <p className='small light'>x</p>
            <div className='content-block base-variable base-large base-right '>
                <FontAxisSelect updateFontAxis={updateFontAxis} axis={'posX'} pos={activeChild.posX}/>
            </div>
        </div>
        <div className='divider'></div>
        <div className='text-control font-size'>
            <p className='small light'>y</p>
            <div className='content-block base-variable base-large base-right '>
            <FontAxisSelect updateFontAxis={updateFontAxis} axis={'posY'} pos={activeChild.posY}/>
            </div>
        </div>
        <div className='divider'></div>
        <div className='text-control font-size'>
            <p className='small light'>z</p>
            <div className='content-block base-variable base-large base-right '>
            <FontAxisSelect updateFontAxis={updateFontAxis} axis={'posZ'} pos={activeChild.posZ}/>
            </div>
        </div>
    </div>
}