import { useNavigate } from "react-router"
import { Button } from "../components/Button"
import { PUBLIC_ROUTES } from "../constants/routes"
import { useState } from "react";
import profession from '../mocks/professions.json';

export function SignupPage () {

    const navigate = useNavigate();

    const [userType, setUserType] = useState('user');

    const userClass = userType === 'user' ? 'bg-primary text-secondary' : 'bg-light text-primary';
    const techClass = userType === 'tech' ? 'bg-primary text-secondary' : 'bg-light text-primary';

    const handleUserType = (type) => {
        setUserType(type);
    }

    return (
        <section className="flex flex-col gap-12 items-center justify-center w-xl mx-auto mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">Registrarse</h1>
            <div className="flex w-full items-center justify-center rounded-lg overflow-hidden">
                <button onClick={() => handleUserType('user')} className={"w-full p-2 md:p-4 transition-all duration-500 ease-in-out md:text-lg cursor-pointer" + " " + userClass}>Usuario</button>
                <button onClick={() => handleUserType('tech')} className={"w-full p-2 md:p-4 transition-all duration-500 ease-in-out md:text-lg cursor-pointer" + " " + techClass}>Técnico</button>
            </div>
            <form className="w-full flex flex-col gap-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                    <div className="flex flex-col gap-2 w-full">
                    <label className="text-lg md:text-xl font-bold">Nombre</label>
                    <input className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="Jane" type="text" />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-lg md:text-xl font-bold">Apellido</label>
                    <input className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="Doe" type="text" />
                </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Correo electrónico</label>
                    <input className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="example@correo.com" type="email" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Contraseña</label>
                    <input className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="***********" type="password" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Confirmar contraseña</label>
                    <input className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="***********" type="password" />
                </div>
                {userType === 'tech' && (
                    <div className="flex flex-col gap-2">
                    <label className="text-lg md:text-xl font-bold">Profesión</label>
                    <select name="" id="" className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary">
                        <option value="null">Seleccione su profesión</option>
                        {profession.map((item) => {
                            return (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            )
                        })}
                    </select>
                    </div>
                )}
            </form>
            <span className="w-full flex gap-1 justify-end">Ya tienes cuenta? <a className="cursor-pointer text-marian-blue" onClick={() => navigate(PUBLIC_ROUTES.WELCOME + PUBLIC_ROUTES.LOGIN)}>Inicia Sesión</a></span>
            <Button model="dark" size={'w-full'} text={'Acceder'}  />
        </section>
    )
}