import { useNavigate } from "react-router"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../constants/routes"
import { Button } from "../components/Button.jsx"
import { ReactIcons } from "../components/ReactIcons.jsx"
import { colors } from "../constants/colors.js"
import Storage from "../storage/app-storage.js"
import { useState } from "react"
import { validatePartialUserForm } from "../utils/form-validation.js"

export function LoginPage () {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }

        const isValid = validatePartialUserForm(user)

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
            const data = await Storage.logIn(user);
            
            if (!data) {
                setEmailError('El correo electrónico o la contraseña son incorrectos')
                return
            }

            navigate(PRIVATE_ROUTES.DASHBOARD.PATH)
        }
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
                    <div className="flex items-center bg-light rounded-lg border border-primary justify-between p-2">
                        <input onChange={(e) => setPassword(e.target.value)} className="outline-none text-lg placeholder:opacity-80 w-full" placeholder="***********" type={passwordVisible ? "text" : "password"} />
                        {passwordVisible ? <ReactIcons onClick={() => setPasswordVisible(!passwordVisible)} iconClass={"cursor-pointer"} color={colors.primary} name={"eyeSlash"} size={25} /> : <ReactIcons onClick={() => setPasswordVisible(!passwordVisible)} iconClass={"cursor-pointer"} color={colors.primary} name={"eye"} size={25} />}
                    </div>
                    <span className="text-red-600 text-xs h-1">{passwordError}</span>
                </div>
            </form>
            <span className="w-full flex gap-1 justify-end">No tienes cuenta? <a className="cursor-pointer text-marian-blue" onClick={() => navigate(PUBLIC_ROUTES.SIGNUP.PATH)}>Regístrate</a></span>
            <Button handleClick={handleSubmit} model="dark" size={'w-full'} text={'Acceder'}  />
        </section>
    )
}