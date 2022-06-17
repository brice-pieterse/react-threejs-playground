export default function positionTextCenter(text, c, width, height, targetWidth){

    text.style.left = `${Math.ceil(c.posX * width/2)}px`
    text.style.top = `${Math.ceil(c.posY * height/2)}px`

}