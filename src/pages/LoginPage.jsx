import { useNavigate } from "react-router"
import { PUBLIC_ROUTES } from "../constants/routes"
import { Button } from "../components/Button.jsx"
import { ReactIcons } from "../components/ReactIcons.jsx"
import { colors } from "../constants/colors.js"

export function LoginPage () {

    const navigate = useNavigate()

    return (
        <section className="flex flex-col gap-6 items-center justify-center w-xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">Inicio de Sesión</h1>
            <form className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Correo Electrónico</label>
                    <input className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="example@correo.com" type="email" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Contraseña</label>
                    <input className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="***********" type="password" />
                </div>
            </form>
            <span className="w-full flex gap-1 justify-end">No tienes cuenta? <a className="cursor-pointer text-marian-blue" onClick={() => navigate(PUBLIC_ROUTES.WELCOME + PUBLIC_ROUTES.SIGNUP)}>Regístrate</a></span>
            <Button model="dark" size={'w-full'} text={'Acceder'}  />
            <button className="bg-blue-600 text-light w-full p-4 font-bold text-lg rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-200 ease-in-out cursor-pointer hover:scale-101">
                <ReactIcons name={"google"} color={colors.light} size={25}/>
                Acceder con Google
            </button>
        </section>
    )
}