import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { ProfessionPil } from "../components/ProfessionPil.jsx";
import { PUBLIC_ROUTES } from "../constants/routes.js";
import { useEffect, useState } from "react";
import Storage from "../storage/app-storage.js"

export function WelcomePage () {

    const navigate = useNavigate()

    const [professions, setProfessions] = useState([]);

    useEffect(() => {
            const shuffle = (array) => {
                array.sort(() => Math.random() - 0.5);
                return array;
            }
            const fetchProfessions = async () => {
                const professions = await Storage.getProfessions();
                if (professions) {
                    setProfessions(shuffle(professions).slice(0, 15));
                } else {
                    console.error('Error fetching professions');
                }
            };
            fetchProfessions();
        }, []);

    

    return (
        <section className="flex flex-col items-center justify-center gap-20 p-4 text-center max-w-6xl overflow-hidden">
            <header className="flex flex-col items-center justify-center gap-4">
                <h1 className="font-bold text-4xl md:text-5xl">Bienvenido a TechFinder</h1>
                <h3 >Encuentra técnicos experimentados para todas tus necesidades</h3>
            </header>
            <main className="flex flex-col items-center justify-center gap-10">
                <Button handleClick={() => navigate(PUBLIC_ROUTES.SIGNUP.PATH)} size='w-40' text='Comenzar' model="dark"/>
                <div className="flex flex-wrap gap-2 w-full justify-center">
                    {professions.map((profession) => <ProfessionPil key={profession.id} profession={profession.name} />)}
                </div>
            </main>
            <footer className="flex gap-10 justify-center">
                <div className="flex flex-col items-center justify-center gap-2">
                    <h4 className="text-lg font-bold">¿Tienes un problema?</h4>
                    <p>Encuentra un técnico en tu área</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h4 className="text-lg font-bold">¿Eres un técnico?</h4>
                    <p>Únete a nuestra comunidad y encuentra clientes</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    <h4 className="text-lg font-bold">¿Eres una empresa?</h4>
                    <p>Encuentra técnicos para tu equipo</p>
                </div>
            </footer>
        </section>
    )
}