import { useState } from "react";
import { ReactIcons } from "../../components/ReactIcons.jsx";
import { ROLES } from "../../constants/roles.js";
import Storage from "../../storage/app-storage.js"
import { NotificationBanner } from "../NotificationBanner.jsx";
import { NotificationMessages, NotificationTypes } from "../../constants/notifications.js";

export function Request ({ request, role, setNotification }) {

    const handleEditRequest = () => {

    }

    const handleDeleteRequest = async () => {
        const deletedRequest = await Storage.deleteRequest(request.id)
        if (deletedRequest) {
            setNotification({
                type: NotificationTypes.success,
                message: NotificationMessages.requestDeleted
            })
        } else {
            console.error("Error al eliminar la solicitud")
        }
    }

    return (
        <div className="grid grid-cols-6 items-center justify-between p-4 bg-light rounded-2xl shadow-md gap-2 font-bold">
            <span className="truncate">{request.subject}</span>
            <div className="bg-amber-200 text-amber-500 w-fit py-1 px-3 rounded-4xl flex items-center justify-center justify-self-center">{request.status.name}</div>
            <span className="justify-self-center">{new Date(request.createdAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })}</span>
            <span className="justify-self-center">{new Date(request.lastModified).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })}</span>
            <span className="justify-self-center">{request.techId.businessName}</span>
            <div className="justify-self-end flex gap-2">
                {role === ROLES.USER ? (
                    <>
                    <button className="cursor-pointer"><ReactIcons name={"view"} size={30} /></button>
                    <button className="cursor-pointer"><ReactIcons name={"edit"} size={30} /></button>
                    <button onClick={handleDeleteRequest} className="cursor-pointer"><ReactIcons name={"delete"} size={30} /></button>
                    </>
                ) :
                <>
                    <button className="cursor-pointer"><ReactIcons name={"work"} size={30} /></button>
                </>}
            </div>
        </div>
    )
}