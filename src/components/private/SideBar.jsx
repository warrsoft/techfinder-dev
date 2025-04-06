import { ReactIcons } from "../ReactIcons.jsx"
import { useAuth } from "../../auth/auth.jsx"
import { useNavigate } from "react-router";
import { PRIVATE_ROUTES } from "../../constants/routes.js"
import { colors } from "../../constants/colors.js"
import { Button } from "../Button.jsx"
import { useEffect, useState } from "react";
import Storage from "../../storage/app-storage.js"

export function SideBar () {

    const navigate = useNavigate()

    const [currentPath, setCurrentPath] = useState(window.location.pathname)
    const { user } = useAuth();
    const [allowedRoutes, setAllowedRoutes] = useState([])

    useEffect(() => {
        if(user) {
            const userRole = user.role
            const filteredRoutes = Object.entries(PRIVATE_ROUTES).map(([key, value]) => {
                if(value.ROLE.includes(userRole)) {
                    return { [key]: value }
                }
            }).filter((item) => item !== undefined)
            setAllowedRoutes(filteredRoutes.reduce((acc, curr) => ({ ...acc, ...curr }), {}))
        }
    }, [user])

    const handleSignOut = async () => {
        const signout = await Storage.signOut();
        if(!signout) {
            console.error("Error signing out")
            return
        }
    }

    return (
        <div className="min-w-100 bg-light shadow-lg rounded-xl p-4 flex flex-col h-full">
            <header className="flex items-center w-full">
                <div className="flex items-center gap-2 overflow-hidden">
                <img src={user?.avatarUrl} alt="Avatar" className="w-10 h-10 rounded-[50%]" />
                <span className="overflow-ellipsis w-full">{user?.userName}</span>
                </div>
            </header>
            <main className="flex flex-col grow basis-0">
                <nav className="flex flex-col items-start justify-start mt-10">
                    <ul className="flex flex-col items-start justify-start w-full gap-2">
                        {Object.entries(allowedRoutes).map(([key, value]) => (
                            <li key={key} className={`flex items-center cursor-pointer hover:bg-secondary rounded-lg w-full p-4 gap-2 ${currentPath === value.PATH ? "bg-secondary" : ""}`} onClick={() => {
                                if(user) {
                                    navigate(value.PATH)
                                    setCurrentPath(value.PATH)
                                }
                            }}>
                                <ReactIcons color={colors.primary} size={25} iconClass={"cursor-pointer"} name={key.toLowerCase()}/>
                                <span>{value.NAME}</span>
                            </li>
                        ))}
                    </ul>
                </nav>
            </main>
            <footer>
                <Button handleClick={handleSignOut} text={"Cerrar Sesión"} size={"w-full"} model="dark" />
            </footer>
        </div>
    )
}