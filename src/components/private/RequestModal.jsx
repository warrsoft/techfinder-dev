import { useEffect, useState } from "react"
import { Button } from "../Button"
import Storage from "../../storage/app-storage.js"
import { validateRequestForm } from "../../utils/form-validation.js"
import { useAuth } from "../../auth/auth.jsx"
import { PRIVATE_ROUTES } from "../../constants/routes.js"
import { useNavigate } from "react-router"

export function RequestModal ({ techId = null, setModalShowed, edit = false }) {

    const navigate = useNavigate()

    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")
    const [description, setDescription] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [tech, setTech] = useState(techId)
    const [techError, setTechError] = useState("")

    const { user } = useAuth()

    const [techs, setTechs] = useState([])

    useEffect(() => {
        const fetchTechs = async () => {
            const fetchedTechs = await Storage.getTechs();
            if (fetchedTechs) {
                setTechs(fetchedTechs);
            }
        }

        fetchTechs()
    }, [])

    const handleCloseModal = () => {
        setModalShowed(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setSubjectError("")
        setDescriptionError("")
        setTechError("")

        const request = {
            subject,
            description,
            techId: tech,
            userId: user.id,
        }

        const isValidate = validateRequestForm(request)

        if (!isValidate.success) {
            if(isValidate.error.errors.forEach((error) => {
                if (error.path[0] === 'subject') {
                    setSubjectError(error.message)
                } else if (error.path[0] === 'description') {
                    setDescriptionError(error.message)
                } else if (error.path[0] === 'techId') {
                    setTechError(error.message)
                }
            }
            ))
            return
        }

        if(isValidate.success) {
            const data = await Storage.createRequest(request)

            if (!data) {
                setSubjectError('Error al crear la solicitud')
                return
            }

            setModalShowed(false)
            navigate(PRIVATE_ROUTES.REQUESTS.PATH)
        }
    }

    console.log(techId);


    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-10" onClick={handleCloseModal}></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 z-20 w-full md:w-1/2 lg:w-1/3 flex flex-col gap-8">
                <h2 className="text-2xl font-bold text-center">Nueva Solicitud</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-lg md:text-xl font-bold">Nombre de la solicitud <span className="text-red-600 text-sm">*</span></label>
                        <input onChange={(e) => setSubject(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="Reparacion de aire" type="text" />
                        <span className="text-red-600 text-xs h-1">{subjectError}</span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-lg md:text-xl font-bold">Descripción de la solicitud <span className="text-red-600 text-sm">*</span></label>
                        <textarea onChange={(e) => setDescription(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="Presento inconvenientes con el aire acondicionado de mi casa, está derramando agua" type="text" />
                        <span className="text-red-600 text-xs h-1">{descriptionError}</span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-lg md:text-xl font-bold">Técnico</label>
                        <select className="outline-none p-2 text-lg bg-light rounded-lg border border-primary" onChange={(e) => setTech(e.target.value)}>
                            <option value="0">Selecciona un técnico</option>
                            {techs.map((tech) => (
                                    techId == tech.id ? (
                                    <option value={tech.id} key={tech.id} selected>
                                        {tech.businessName}
                                        {tech.professions.map((profession) => (` (${profession.name})`))}
                                    </option>
                                ) : (
                                   <option value={tech.id} key={tech.id}>
                                        {tech.businessName}
                                        {tech.professions.map((profession) => (` (${profession.name})`))}
                                    </option>
                                )
                                )
                            )}
                        </select>
                        <span className="text-red-600 text-xs h-1">{techError}</span>
                    </div>
                    <Button handleClick={handleSubmit} text={"Enviar solicitud"} model="dark" size={"w-full"}/>
                </form>
            </div>
        </div>
    )
}