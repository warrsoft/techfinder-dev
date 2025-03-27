import { createContext, useContext, useState } from "react";

const NavBarContext = createContext()

export const useNavBar = () => {
    return useContext(NavBarContext)
}

export const NavBarProvider = ({ children }) => {

    const [overlay, setOverlay] = useState('hidden')
    const [navPosition, setNavPosition] = useState('translate-x-full')

    const handleMenuBtn = () => {
        setNavPosition(navPosition === 'translate-x-full' ? 'translate-x-0' : 'translate-x-full')
        setOverlay(overlay === 'hidden' ? '' : 'hidden')
    }

    return (
        <NavBarContext.Provider value={{ overlay, navPosition, handleMenuBtn }}>
            { children }
        </NavBarContext.Provider>
    )
}