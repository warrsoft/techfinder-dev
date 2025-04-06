import { useEffect, useState } from "react"

export function NotificationBanner ({ message, type, setNotification }) {

    const [notificationClass, setNotificationClass] = useState('')

    useEffect(() => {
        setNotificationClass(notificationColor[type] + ' translate-y-0')

        setTimeout(() => {
            setNotificationClass('-translate-y-100')
        }, 4000)

        const timeout = setTimeout(() => {
            setNotification(null)
            setNotificationClass('')
        }
        , 5000)

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    if (!message || !type) return null

    const notificationColor = {
        success: 'bg-green-100 text-green-800',
        error: 'bg-red-100 text-red-800',
        info: 'bg-blue-100 text-blue-800',
        warning: 'bg-yellow-100 text-yellow-800',
    }

    return (
        <div className={`fixed z-50 w-fit text-center top-5 left-1/2 transform -translate-x-1/2 -translate-y-100 ease-in-out transition-all duration-500 p-4 rounded-xl ${notificationClass}`}>
            <p>{message}</p>
        </div>
    )
}