import { ReactIcons } from "./ReactIcons";
import { colors } from '../constants/colors.js'
import { Button } from "./Button.jsx";
import { useNavigate } from "react-router";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../constants/routes.js";
import { useNavBar } from "../contexts/NavBarContext.jsx";
import { useAuth } from "../auth/auth.jsx";

export function TopBar () {

    const navigate = useNavigate()

    const { navPosition, handleMenuBtn } = useNavBar()

    const { user } = useAuth()

    return (
        <header className="md:flex md:items-center md:justify-between md:w-full md:p-4 md:fixed md:bg-secondary md:z-10">
            <div className="flex items-center justify-between w-full p-4 fixed bg-secondary z-10 md:static md:p-0 md:bg-transparent">
                <h1 onClick={() => navigate(PUBLIC_ROUTES.WELCOME)} className="font-bold text-xl md:text-2xl lg:text-4xl cursor-pointer">TechFinder</h1>
                <ReactIcons onClick={handleMenuBtn} iconClass='md:hidden cursor-pointer' name='menu' size={40} color={colors.primary}/>
            </div>
            
            <nav className={"fixed md:translate-none transition-all duration-500 ease-in-out md:static z-50 bg-secondary md:bg-transparent shadow-xl md:shadow-none flex flex-col md:flex-row items-center justify-start pt-20 md:pt-0 right-0 top-0 h-dvh md:h-auto w-[75%] md:w-auto gap-4 " + navPosition}>
                {user ?
                    <Button model="dark" handleClick={() => navigate(PRIVATE_ROUTES.DASHBOARD)} text='Inicio' />
                 : 
                <>
                    <Button handleClick={() => navigate(PUBLIC_ROUTES.LOGIN)} text='Iniciar Sesión' />
                    <Button handleClick={() => navigate(PUBLIC_ROUTES.SIGNUP)} text='Comenzar' model="dark"/>
                </>
                }
            </nav>
        </header>
    )
}