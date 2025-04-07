import "leaflet/dist/leaflet.css"
import { TechnicalCard } from "../../components/private/TechnicalCard.jsx"
import { LeafLetMap } from "../../components/private/LeafLetMap.jsx"
import { useEffect, useMemo, useState } from "react"
import Storage  from "../../storage/app-storage.js"
import { RequestModal } from "../../components/private/RequestModal.jsx"
import { useTechFilter } from "../../contexts/TechFilterContext.jsx"

export function DashboardPage () {

    const [techIdNewRequest, setTechIdNewRequest] = useState(null)
    const [professions, setProfessions] = useState([])
    const [provinces, setProvinces] = useState([])

    const [modalShowed, setModalShowed] = useState(false)

    const { filteredTechs, updateFilters } = useTechFilter()

    const handleNewRequest = () => {
        setModalShowed(true)
    }

    useEffect(() => {

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
    }, [])

    const requestModal = modalShowed ? <RequestModal setModalShowed={setModalShowed} techId={techIdNewRequest} /> : null

    const memoizedMap = useMemo(() => <LeafLetMap techs={filteredTechs && filteredTechs} height={"h-full"} />, [filteredTechs])

    return (
        <>
            <div className="w-full h-full flex flex-col gap-4 p-4">
            <header className="flex gap-2 w-full itemns-center justify-end">
                <select onChange={(e) => updateFilters({ profession: parseInt(e.target.value) })} className="outline-none p-2 text-lg bg-light rounded-lg border border-primary">
                    <option value="0">Todas las profesiones</option>
                    {professions.map((profession) => (
                          <option key={profession.id} value={profession.id}>{profession.name}</option>
                    ))}
                </select>
                <select onChange={(e) => updateFilters({ province: parseInt(e.target.value) })} className="outline-none p-2 text-lg bg-light rounded-lg border border-primary">
                    <option value="0">Todas las provincias</option>
                    {provinces.map((province) => (
                        <option key={province.id} value={province.id}>{province.name}</option>
                    ))}
                </select>
                <select onChange={(e) => updateFilters({ rating: parseInt(e.target.value) })} className="outline-none p-2 text-lg bg-light rounded-lg border border-primary">
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
                    {filteredTechs.map((tech) => (
                        <TechnicalCard key={tech.id} tech={tech} modalShowed={handleNewRequest} setTechIdNewRequest={setTechIdNewRequest} isPrivate />
                    ))}
                </div>
                <div className="w-full h-full">
                    {memoizedMap}
                </div>
            </main>
        </div>
        {requestModal}
        </>
    )
}