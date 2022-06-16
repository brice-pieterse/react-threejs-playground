const { REACT_APP_FONTS } = process.env

// configure firebase functions using google fonts api key
export function fetchFontLibrary(){
    //const endpoint = window.encodeURI(FONTS_ENDPOINT)

    // fake fetch
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve([
            {
                font: 'Inter',
                id: 1,
                variants: {
                    'Black': '/assets/fonts/inter/Inter-Black.ttf',
                    'Extra Bold': '/assets/fonts/inter/Inter-ExtraBold.ttf',
                    'Bold': '/assets/fonts/inter/Inter-Bold.ttf',
                    'Semi Bold': '/assets/fonts/inter/Inter-SemiBold.ttf',
                    'Medium': '/assets/fonts/inter/Inter-Medium.ttf',
                    'Regular': '/assets/fonts/inter/Inter-Regular.ttf',
                    'Light': '/assets/fonts/inter/Inter-Light.ttf',
                    'Extra Light': '/assets/fonts/inter/Inter-ExtraLight.ttf',
                    'Thin': '/assets/fonts/inter/Inter-Thin.ttf'
                }
            },
            // {
            //     font: 'Chinese',
            //     id: 2,
            //     variants: {
            //         'Black': '/assets/fonts/noto_sc/NotoSansSC-Black.otf',
            //         'Bold': '/assets/fonts/noto_sc/NotoSansSC-Bold.otf',
            //         'Medium': '/assets/fonts/noto_sc/NotoSansSC-Medium.otf',
            //         'Regular': '/assets/fonts/noto_sc/NotoSansSC-Regular.otf',
            //         'Light': '/assets/fonts/noto_sc/NotoSansSC-Light.otf',
            //         'Thin': '/assets/fonts/noto_sc/NotoSansSC-Thin.otf'
            // }
            //}
        ])
        }, 100)

    })
}