import { createContext, useContext, useEffect, useState } from "react";
import Storage from "../storage/app-storage.js"

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

    const [filteredTechs, setFilteredTechs] = useState([])

    const [techs, setTechs] = useState([])

    useEffect(() => {
        const fetchTechs = async () => {
            const techsFetched = await Storage.getTechs()
            setTechs(techsFetched)
        }

        fetchTechs()
    }, [])

    useEffect(() => {
        const filterTechs = () => {
            let filtered = techs

            if (filters.profession) {
                filtered = filtered.filter(tech => (tech.professions.map(prof => (prof.id === filters.profession)).includes(true)));
            }

            if (filters.province) {
                filtered = filtered.filter(tech => tech.province === filters.province)
            }

            if (filters.rating) {
                filtered = filtered.filter(tech => tech.rating >= filters.rating)
            }

            setFilteredTechs(filtered)
        }

        filterTechs()
    }, [filters, techs])

    const updateFilters = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
    }

    return (
        <techFilterContext.Provider value={{ filteredTechs, filters, updateFilters }}>
            {children}
        </techFilterContext.Provider>
    )
}