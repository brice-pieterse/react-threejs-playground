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
    const [fontFamily, setFontFamily] = useState()
    const [fontSize, setFontSize] = useState(0.25)
    const [fontWeight, setFontWeight] = useState()
    const [fontAlignment, setFontAlignment] = useState('center')
    const [fontColor, setFontColor] = useState('#ffffff')
    const [defaultLorem, setDefaultLorem] = useState('Lorem Ipsum')

    React.useEffect(() => {
        fetchFontLibrary().then(fonts => {
            setLoading(false);
            setFontLibrary(fonts)
            setFontFamily(fonts[0])
            setFontWeight(Object.keys(fonts[0].variants)[0])
        })
    }, [])

    const updateDefaultFontFamily = (family) => {
        console.log(family)
        setFontFamily(family)
        setFontWeight(Object.keys(family.variants)[0])

        if (family.font === 'Chinese'){
            setDefaultLorem('鉴于对人类家庭所有成员的固严')
        }
    }

    return {
        loading,
        defaultLorem,
        fontLibrary,
        fontFamily,
        updateDefaultFontFamily,
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