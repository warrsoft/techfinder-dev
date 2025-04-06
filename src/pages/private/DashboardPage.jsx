import "leaflet/dist/leaflet.css"
import { TechnicalCard } from "../../components/private/TechnicalCard.jsx"
import { Map } from "../../components/private/Map.jsx"
import { useEffect, useMemo, useState } from "react"
import Storage  from "../../storage/app-storage.js"
import { useTechFilter } from "../../contexts/TechFilterContext.jsx"

export function DashboardPage () {

    const [techs, setTechs] = useState([])
    const [professions, setProfessions] = useState([])
    const [provinces, setProvinces] = useState([])

    const { filters, updateFilters } = useTechFilter()

    useEffect(() => {
        const fetchTechs = async () => {
            const techsFetched = await Storage.getTechs()
            setTechs(techsFetched)
        }

        const fetchProfessions = async () => {
                        const professions = await Storage.getProfessions()
                        if (professions) {
                            setProfessions(professions)
                        } else {
                            console.error('Error fetching professions')
                        }
                    }
            
        const fetchProvinces = async () => {
                        const provinces = await Storage.getProvinces()
                        if (provinces) {
                            setProvinces(provinces)
                        } else {
                            console.error('Error fetching provinces')
                        }
                    }

        fetchProfessions()
        fetchProvinces()
        fetchTechs()
    }, [])

    const memoizedMap = useMemo(() => <Map techs={techs && techs} height={"h-full"} />, [techs])

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <header className="flex gap-2 w-full itemns-center justify-end">
                <select className="outline-none p-2 text-lg bg-light rounded-lg border border-primary">
                    <option value="0">Todas las profesiones</option>
                    {professions.map((profession) => (
                        <>
                            <option key={profession.id} value={profession.id}>{profession.name}</option>
                            
                            profession.id === filters.profession && <option key={profession.id} value={profession.id}>{profession.name}</option>
                        </>
                    ))}
                </select>
                <select className="outline-none p-2 text-lg bg-light rounded-lg border border-primary">
                    <option value="0">Todas las provincias</option>
                    {provinces.map((province) => (
                        <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                </select>
                <select className="outline-none p-2 text-lg bg-light rounded-lg border border-primary">
                    <option value="0">Todas las califaciones</option>
                    <option value="1">1 estrella</option>
                    <option value="2">2 estrellas</option>
                    <option value="3">3 estrellas</option>
                    <option value="4">4 estrellas</option>
                    <option value="5">5 estrellas</option>
                </select>
            </header>
            <main className="w-full h-full flex gap-4">
                <div className="flex flex-col gap-4">
                    {techs.map((tech, index) => (
                        <TechnicalCard key={index} name={tech.businessName} professions={tech.professions} isPrivate />
                    ))}
                </div>
                <div className="w-full h-full">
                    {memoizedMap}
                </div>
            </main>
        </div>
    )
}