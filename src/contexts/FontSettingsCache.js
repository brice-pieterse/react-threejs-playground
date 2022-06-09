import React, { createContext, useContext, useState } from 'react'

const fontSettingsCacheContext = createContext();

export default function FontSettingsProvider({ children }){
    const fontSettings = useProvideFontSettingsCache();
    return <fontSettingsCacheContext.Provider value={fontSettings}>
        {children}
    </fontSettingsCacheContext.Provider>
}

export function useFontSettingsCache(){
    return useContext(fontSettingsCacheContext)
}

function useProvideFontSettingsCache(){
    const [font, setFont] = useState('/fonts/inter/Inter_500.json')
    const [fontSize, setfontSize] = useState(0.25)
    const [fontAlignment, setfontAlignment] = useState('left')
    const [fontColor, setFontColor] = useState('#ffffff')

    return {
        font,
        setFont,
        fontSize,
        setfontSize,
        fontAlignment,
        setfontAlignment,
        fontColor,
        setFontColor
    }
}