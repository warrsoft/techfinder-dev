import { createContext, useContext, useState } from "react";

const techFilterContext = createContext()

export const useTechFilter = () => {
    return useContext(techFilterContext)
}

export function TechFilterProvider({ children }) {
    const [filters, setFilters] = useState({
        profession: null,
        province: null,
        rating: null,
    })

    const updateFilters = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
    }

    return (
        <techFilterContext.Provider value={{ filters, updateFilters }}>
            {children}
        </techFilterContext.Provider>
    )
}