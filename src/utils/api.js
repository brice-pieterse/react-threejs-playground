import inter from '../assets/fonts/inter/Inter-VariableFont.ttf'

const { REACT_APP_FONTS } = process.env

// configure firebase functions using google fonts api key
export function fetchFontLibrary(){
    //const endpoint = window.encodeURI(FONTS_ENDPOINT)

    // fake fetch
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve([{
                font: 'Inter',
                type: 'variable',
                file: inter
            }])
        }, 100)

    })
}