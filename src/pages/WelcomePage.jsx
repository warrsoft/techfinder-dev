import { useNavigate } from "react-router";
import { Button } from "../components/Button";
import { ProfessionPil } from "../components/ProfessionPil.jsx";
import { TechnicalCard } from "../components/TechnicalCard.jsx"
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
        <section className="flex flex-col items-center justify-center gap-10 p-4 text-center max-w-6xl">
            <header className="flex flex-col items-center justify-center gap-4">
                <h1 className="font-bold text-4xl md:text-5xl">Bienvenido a TechFinder</h1>
                <h3 >Encuentra técnicos experimentados para todas tus necesidades</h3>
            </header>
            <main className="flex flex-col items-center justify-center gap-8">
                <Button handleClick={() => navigate(PUBLIC_ROUTES.SIGNUP)} size='w-40' text='Comenzar' model="dark"/>
                <div className="flex flex-wrap gap-2 w-full justify-center">
                    {professions.map((item) => <ProfessionPil key={item.id} profession={item.profession} />)}
                </div>
            </main>
            <footer className="flex flex-wrap gap-4 justify-center">
                    <TechnicalCard avatar={"https://th.bing.com/th/id/OIP.zOGAknj6ivM3p2zbGwkDogHaHa?rs=1&pid=ImgDetMain"} name={"John Doe"} profession={"Electricista"} rating={4.5}/>
                    <TechnicalCard avatar={"https://th.bing.com/th/id/OIP.zOGAknj6ivM3p2zbGwkDogHaHa?rs=1&pid=ImgDetMain"} name={"John Doe"} profession={"Electricista"} rating={4.5}/>
                    <TechnicalCard avatar={"https://th.bing.com/th/id/OIP.zOGAknj6ivM3p2zbGwkDogHaHa?rs=1&pid=ImgDetMain"} name={"John Doe"} profession={"Electricista"} rating={4.5}/>
                    <TechnicalCard avatar={"https://th.bing.com/th/id/OIP.zOGAknj6ivM3p2zbGwkDogHaHa?rs=1&pid=ImgDetMain"} name={"John Doe"} profession={"Electricista"} rating={4.5}/>
                    <TechnicalCard avatar={"https://th.bing.com/th/id/OIP.zOGAknj6ivM3p2zbGwkDogHaHa?rs=1&pid=ImgDetMain"} name={"John Doe"} profession={"Electricista"} rating={4.5}/>
            </footer>
        </section>
    )
}