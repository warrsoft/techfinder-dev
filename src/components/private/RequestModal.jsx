import { useEffect, useState } from "react"
import { Button } from "../Button"
import Storage from "../../storage/app-storage.js"
import { validateRequestForm } from "../../utils/form-validation.js"
import { useAuth } from "../../auth/auth.jsx"
import { PRIVATE_ROUTES } from "../../constants/routes.js"
import { useNavigate } from "react-router"
import { NotificationBanner } from "../NotificationBanner.jsx"
import { NotificationMessages, NotificationTypes } from "../../constants/notifications.js"
import { ROLES } from "../../constants/roles.js"

export function RequestModal ({ techId = null, setModalShowed, request = null, userRole = null}) {

    const navigate = useNavigate()

    const [notification, setNotification] = useState(null)
    const [subject, setSubject] = useState("")
    const [subjectError, setSubjectError] = useState("")
    const [description, setDescription] = useState("")
    const [descriptionError, setDescriptionError] = useState("")
    const [tech, setTech] = useState(techId)
    const [techError, setTechError] = useState("")
    const [readOnly, setReadonly] = useState(false)
    const [requestsStatus, setRequestsStatus] = useState([])
    const [requestStatus, setRequestStatus] = useState(request ? request.status.id : null)
    const [role, setRole] = useState(userRole)
    const [requestUser, setRequestUser] = useState(null)

    const { user } = useAuth()

    const [techs, setTechs] = useState([])

    useEffect(() => {
        const fetchTechs = async () => {
            const fetchedTechs = await Storage.getTechs();
            if (fetchedTechs) {
                setTechs(fetchedTechs);
            }
        }

        const fetchRequestsStatus = async () => {
            const fetchedRequestStatus = await Storage.getRequestStatus()
            console.log(fetchedRequestStatus);
            if (fetchedRequestStatus) {
                setRequestsStatus(fetchedRequestStatus)
            }
        }

        const fetchRequestUser = async () => {
            const fetchedRequestUser = await Storage.getUserById(request.userId)
            if (fetchedRequestUser) {
                setRequestUser(fetchedRequestUser)
            }
        }

        if(request) {
            setSubject(request.subject)
            setDescription(request.description)
            setTech(request.techId.id)
            request.status.id === 1 && role === ROLES.USER ? setReadonly(false) : setReadonly(true)
        }

        fetchTechs()
        fetchRequestsStatus()
        fetchRequestUser()
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
            userRole === ROLES.USER ? navigate(PRIVATE_ROUTES.REQUESTS.PATH) : navigate(PRIVATE_ROUTES.TECHNICIANS.PATH)
        }
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault()

        if(readOnly && userRole === ROLES.USER) {
            setNotification({
                type: NotificationTypes.error,
                message: NotificationMessages.requestAlreadyTaken
            })
        }

        setSubjectError("")
        setDescriptionError("")
        setTechError("")

        const requestData = {
            subject,
            description,
            techId: request.techId.id,
            userId: request.userId,
            statusId: parseInt(requestStatus)
        }

        const isValidate = validateRequestForm(requestData)

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

        console.log(requestData);

        if(isValidate.success) {
            const data = await Storage.updateRequest(request.id, requestData)

            if (!data) {
                setSubjectError('Error al editar la solicitud')
                return
            }

            setModalShowed(false)
            userRole === ROLES.USER ? navigate(PRIVATE_ROUTES.REQUESTS.PATH) : navigate(PRIVATE_ROUTES.TECHNICIANS.PATH)
        }
    }


    return (
        <>
            <div>
            <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-10" onClick={handleCloseModal}></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 z-20 w-full md:w-1/2 lg:w-1/3 flex flex-col gap-8">
                <h2 className="text-2xl font-bold text-center">Nueva Solicitud</h2>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-lg md:text-xl font-bold">Nombre de la solicitud <span className="text-red-600 text-sm">*</span></label>
                        <input onChange={(e) => setSubject(e.target.value)} value={subject} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="Reparacion de aire" type="text" readOnly={readOnly} />
                        <span className="text-red-600 text-xs h-1">{subjectError}</span>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-lg md:text-xl font-bold">Descripción de la solicitud <span className="text-red-600 text-sm">*</span></label>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="Presento inconvenientes con el aire acondicionado de mi casa, está derramando agua" type="text" readOnly={readOnly} />
                        <span className="text-red-600 text-xs h-1">{descriptionError}</span>
                    </div>
                    {role === ROLES.TECH && (
                        <>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg md:text-xl font-bold">Información del cliente</label>
                            {requestUser && (
                                <>
                                    <span className="flex gap-2 text-lg">Nombre: {`${requestUser.name} ${requestUser.lastName}`}</span>
                                    <span className="flex gap-2 text-lg">Correo: {requestUser.email}</span>
                                    <span className="flex gap-2 text-lg">Teléfono: {requestUser.phone}</span>
                                </>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-lg md:text-xl font-bold">Estatus de Solicitud</label>
                            <select className="outline-none p-2 text-lg bg-light rounded-lg border border-primary" onChange={(e) => setRequestStatus(e.target.value)}>
                                {requestsStatus.map((status) => (
                                        requestStatus == status.id ? (
                                        <option value={status.id} key={status.id} selected>
                                            {status.name}
                                        </option>
                                    ) : (
                                    <option value={status.id} key={status.id}>
                                            {status.name}
                                        </option>
                                    )
                                    )
                                )}
                            </select>
                            <span className="text-red-600 text-xs h-1"></span>
                        </div>
                        </>
                    )}
                    <div className="flex flex-col gap-2 w-full">
                        <label className="text-lg md:text-xl font-bold">Técnico</label>
                        <select className="outline-none p-2 text-lg bg-light rounded-lg border border-primary" onChange={(e) => setTech(e.target.value)} disabled={readOnly}>
                            <option value="0">Selecciona un técnico</option>
                            {techs.map((item) => (
                                    tech == item.id ? (
                                    <option value={item.id} key={item.id} selected>
                                        {item.businessName}
                                        {item.professions.map((profession) => (` (${profession.name})`))}
                                    </option>
                                ) : (
                                   <option value={item.id} key={item.id}>
                                        {item.businessName}
                                        {item.professions.map((profession) => (` (${profession.name})`))}
                                    </option>
                                )
                                )
                            )}
                        </select>
                        <span className="text-red-600 text-xs h-1">{techError}</span>
                    </div>
                    <Button handleClick={request ? handleEditSubmit : handleSubmit} text={"Enviar solicitud"} model="dark" size={"w-full"}/>
                </form>
            </div>
        </div>
        {notification && <NotificationBanner setNotification={setNotification} message={notification.message} type={notification.type} />}
        </>
    )
}