import React, { createContext, useContext, useState } from 'react'
import { fetchFontLibrary } from '../utils/api.js'

const fontSettingsCacheContext = createContext();

export default function FontSettingsProvider({ children }){
    const fontSettings = useProvideFontSettingsCache();
    return <fontSettingsCacheContext.Provider value={fontSettings}>
        {!fontSettings.loading && children}
    </fontSettingsCacheContext.Provider>
}

export function useFontSettingsCache(){
    return useContext(fontSettingsCacheContext)
}

function useProvideFontSettingsCache(){
    const [loading, setLoading] = React.useState(true)
    const [fontLibrary, setFontLibrary] = useState();
    const [font, setFont] = useState()
    const [fontSize, setFontSize] = useState(0.25)
    const [fontWeight, setFontWeight] = useState(400)
    const [fontAlignment, setFontAlignment] = useState('left')
    const [fontColor, setFontColor] = useState('#ffffff')

    React.useEffect(() => {
        fetchFontLibrary().then(fonts => {
            setLoading(false);
            setFontLibrary(fonts)
            setFont(fonts[0])
        })
        
    }, [])

    return {
        loading,
        fontLibrary,
        font,
        setFont,
        fontWeight,
        setFontWeight,
        fontSize,
        setFontSize,
        fontAlignment,
        setFontAlignment,
        fontColor,
        setFontColor
    }
}