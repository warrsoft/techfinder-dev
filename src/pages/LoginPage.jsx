import { useNavigate } from "react-router"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../constants/routes"
import { Button } from "../components/Button.jsx"
import { ReactIcons } from "../components/ReactIcons.jsx"
import { colors } from "../constants/colors.js"
import Storage from "../storage/app-storage.js"
import { useState } from "react"
import { validatePartialForm } from "../utils/form-validation.js"

export function LoginPage () {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }

        const isValid = validatePartialForm(user)

        setEmailError('');
        setPasswordError('');
        
        if(!isValid.success) {
            isValid.error.errors.forEach((error) => {
                if (error.path[0] === 'email') {
                    setEmailError(error.message)
                } else if (error.path[0] === 'password') {
                    setPasswordError(error.message)
                }
            })
            return
        }

        if(isValid.success) {
            const data = await Storage.login(user);
            
            if (data) {
                const { user, error } = data;
                if (error) {
                    console.error('Error logging in:', error);
                    return;
                }
                if (user) {
                    navigate(PUBLIC_ROUTES.WELCOME + PRIVATE_ROUTES.DASHBOARD)
                }
            }
        }
    }

    const handleGoogleLogin = async () => {
        await Storage.accessWithGoogle();
    }

    return (
        <section className="flex flex-col gap-6 items-center justify-center w-xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">Inicio de Sesión</h1>
            <form className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Correo Electrónico <span className="text-red-600 text-sm">*</span></label>
                    <input onChange={(e) => setEmail(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="example@correo.com" type="email" />
                    <span className="text-red-600 text-xs h-1">{emailError}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Contraseña <span className="text-red-600 text-sm">*</span></label>
                    <input onChange={(e) => setPassword(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="***********" type="password" />
                    <span className="text-red-600 text-xs h-1">{passwordError}</span>
                </div>
            </form>
            <span className="w-full flex gap-1 justify-end">No tienes cuenta? <a className="cursor-pointer text-marian-blue" onClick={() => navigate(PUBLIC_ROUTES.WELCOME + PUBLIC_ROUTES.SIGNUP)}>Regístrate</a></span>
            <Button handleClick={handleSubmit} model="dark" size={'w-full'} text={'Acceder'}  />
            <button onClick={handleGoogleLogin} className="bg-blue-600 text-light w-full p-4 font-bold text-lg rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-200 ease-in-out cursor-pointer hover:scale-101">
                <ReactIcons name={"google"} color={colors.light} size={25}/>
                Acceder con Google
            </button>
        </section>
    )
}