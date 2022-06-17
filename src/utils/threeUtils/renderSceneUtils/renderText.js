import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

import positionTextCenter from './positionTextCenter';
import positionTextLeft from './positionTextLeft';
import positionTextRight from './positionTextRight';


export default function renderText(c, width, height, updateChild){

    const text = document.createElement('p')

    let changeTimeout;

    // sync text updates
    text.oninput = (e) => {
        if (changeTimeout){
            window.clearTimeout(changeTimeout)
        }
        changeTimeout = setTimeout(() => {
            updateChild('fontText', e.target.innerText, c)
        }, 1000)
    }
    text.style.position = 'absolute'

    text.style.textAlign = c.fontAlignment
    text.style.color = c.fontColor
    text.innerText = c.fontText
    // check if document.fonts already contains the font
    if (document.fonts.check(`12px ${c.fontFamily.font}`)){
        text.style.fontFamily = c.fontFamily.font
    }
    else {
        const newFont = new FontFace(`${c.fontFamily.font} ${c.fontWeight}`, `url(${c.fontFamily.variants[c.fontWeight]})`);
        newFont.load()
        .then((loaded_face) => {
            document.fonts.add(loaded_face);
            text.style.fontFamily = loaded_face.family
        })

    }
    text.setAttribute('contenteditable', '')
    // font weight
    text.style.fontWeight = c.fontWeight
    // font size needs to be dynamic such that it takes up % of canvas width
    text.style.opacity = 0
    text.style.fontSize = '0px'
    text.style.display = 'inline-block'
    text.style.lineHeight = '0px'
    // first add it to the css scene wrapper and measure how much space it fills
    document.querySelector('.css3').appendChild(text)
    const targetWidth = c.fontSize * width
    let fontSizer = 0

    while (text.clientWidth < targetWidth - 40){
        text.style.fontSize = `${fontSizer + 4}px`
        text.style.lineHeight = `${fontSizer + 4}px`
        fontSizer += 4
    }

    if (c.fontAlignment === 'left'){
        positionTextLeft(text, c, width, height, targetWidth)
    }
    else if (c.fontAlignment === 'center'){
        positionTextCenter(text, c, width, height, targetWidth)
    }
    else positionTextRight(text, c, width, height, targetWidth)

    // font will be perfect size and position
    document.querySelector('.css3').removeChild(text)
    text.style.opacity = 1

    return new CSS3DObject(text);
}