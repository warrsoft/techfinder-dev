import { useNavigate } from "react-router"
import { Button } from "../components/Button"
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../constants/routes"
import { useState } from "react";
import { ReactIcons } from "../components/ReactIcons"
import { colors } from "../constants/colors"
import Storage from "../storage/app-storage.js"
import { validateForm } from "../utils/form-validation.js";
import { supabase } from "../services/supabase.js";
 
export function SignupPage () {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
                const user = {
                    email,
                    password,
                    confirmPassword
                }
        
                const isValid = validateForm(user)
        
                setEmailError('');
                setPasswordError('');
                setConfirmPasswordError('');

                if(password !== confirmPassword) {
                    setConfirmPasswordError('Las contraseñas no coinciden')
                    return
                }
                
                if(!isValid.success) {
                    isValid.error.errors.forEach((error) => {
                        if (error.path[0] === 'email') {
                            setEmailError(error.message)
                        } else if (error.path[0] === 'password') {
                            setPasswordError(error.message)
                        } else if (error.path[0] === 'confirmPassword') {
                            setConfirmPasswordError(error.message)
                        }
                    })
                    return
                }
        
                if(isValid.success) {
                    const { email, password } = user;
                    const newUser = {
                        email,
                        password
                    }
                    const data = await Storage.signup(newUser);
                    
                    if (data) {
                        const { user, error } = data;
                        if (error) {
                            console.error('Error signing up:', error);
                            return;
                        }
                        if (user) {
                            const { data: userData, error } = await supabase.auth.getUser()
                            if (error) {
                                console.error('Error getting user:', error);
                                return;
                            }
                            if (userData) {
                                await Storage.createNewUser({ id: userData.user.id })
                                navigate(PUBLIC_ROUTES.WELCOME + PRIVATE_ROUTES.DASHBOARD)
                            }
                        }
                    }
                }
    }

    const handleGoogleLogin = async () => {
        await Storage.accessWithGoogle();
    }

    return (
        <section className="flex flex-col gap-6 items-center justify-center w-xl mx-auto mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">Registrarse</h1>
            <form className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Correo electrónico <span className="text-red-600 text-sm">*</span></label>
                    <input onChange={(e) => setEmail(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="example@correo.com" type="email" />
                    <span className="text-red-600 text-xs h-1">{emailError}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Contraseña <span className="text-red-600 text-sm">*</span></label>
                    <input onChange={(e) => setPassword(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="***********" type="password" />
                    <span className="text-red-600 text-xs h-1">{passwordError}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Confirmar contraseña <span className="text-red-600 text-sm">*</span></label>
                    <input onChange={(e) => setConfirmPassword(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="***********" type="password" />
                    <span className="text-red-600 text-xs h-1">{confirmPasswordError}</span>
                </div>
            </form>
            <span className="w-full flex gap-1 justify-end">Ya tienes cuenta? <a className="cursor-pointer text-marian-blue" onClick={() => navigate(PUBLIC_ROUTES.WELCOME + PUBLIC_ROUTES.LOGIN)}>Inicia Sesión</a></span>
            <Button handleClick={handleSubmit} model="dark" size={'w-full'} text={'Acceder'}  />
            <button onClick={handleGoogleLogin} className="bg-blue-600 text-light w-full p-4 font-bold text-lg rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-all duration-200 ease-in-out cursor-pointer hover:scale-101">
                <ReactIcons name={"google"} color={colors.light} size={25}/>
                Acceder con Google
            </button>
        </section>
    )
}