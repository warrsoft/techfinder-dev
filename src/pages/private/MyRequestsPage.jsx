import { useState } from "react"
import { Button } from "../../components/Button.jsx"
import { Request } from "../../components/private/Request.jsx"
import { RequestModal } from "../../components/private/RequestModal.jsx"
import { useRequests } from "../../hooks/useRequests.jsx"
import { ROLES } from "../../constants/roles.js"
import { NotificationBanner } from "../../components/NotificationBanner.jsx"

export function RequestsPage () {

    const [modalShowed, setModalShowed] = useState(false)
    const requests = useRequests(ROLES.USER)
    const [notification, setNotification] = useState(null)

    const handleNewRequest = () => {
        setModalShowed(true)
    }

    const requestModal = modalShowed ? <RequestModal setModalShowed={setModalShowed} /> : null

    return (
        <>
            <div className="w-full flex flex-col gap-4 p-4 overflow-y-auto">
            <header className="w-full flex justify-between items-center">
                <h1 className="font-bold text-2xl">Mis Solicitudes</h1>
                <Button handleClick={handleNewRequest} text={"Nueva Solicitud"}  model="dark" />
            </header>
            <main>
                <div className="grid grid-cols-6 items-center justify-between p-4 bg-light rounded-2xl shadow-md gap-2 font-bold">
                    <span>Solicitud</span>
                    <span className="justify-self-center">Estado</span>
                    <span className="justify-self-center">Fecha de Creación</span>
                    <span className="justify-self-center">Última Modificación</span>
                    <span className="justify-self-center">Técnico</span>
                    <span className="justify-self-end">Acciones</span>
                </div>
                <div className="w-full flex flex-col gap-4 mt-4">
                    {requests.length > 0 && requests.map((request) => (
                        <Request setNotification={setNotification} key={request.id} request={request} role={ROLES.USER} />
                    ))}
                </div>
            </main>
        </div>
            {requestModal}
            {notification && <NotificationBanner setNotification={setNotification} message={notification.message} type={notification.type} />}
        </>
    )
}