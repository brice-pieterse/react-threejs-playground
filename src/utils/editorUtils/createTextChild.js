export default function createTextChild(fontSettings, index, posX, posY){
    const child = {
        type: 'text',
        index: index,
        posX,
        posY,
        fontText: `${fontSettings.defaultLorem} ${index}`,
        fontColor: fontSettings.fontColor,
        fontFamily: fontSettings.fontFamily,
        fontWeight: fontSettings.fontWeight,
        fontSize: fontSettings.fontSize,
        fontAlignment: fontSettings.fontAlignment
    }
    return child
}