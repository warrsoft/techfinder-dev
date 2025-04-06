import { ProfessionPil } from "../ProfessionPil";
import { ReactIcons } from "../ReactIcons";

export function TechnicalCard ({ avatar = null, name, professions = [], rating, isPrivate = false }) {

    if(!name) return null

    return (
        <article className="flex items-center justify-between gap-4 p-4 bg-white shadow-md rounded-xl w-100">
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                {!isPrivate && (
                    <img src={avatar} className="w-30" alt="" />
                )}
                    <h3 className="font-bold text-xl">{name}</h3>
                </div>
                <div className="flex gap-2 flex-wrap">
                    {professions.map((profession) => (
                    <ProfessionPil key={profession.id} profession={profession.name} />
                    ))}
                </div>
                {rating > 0 && (
                    <div className="flex items-center gap-2">
                        <ReactIcons name='star' size={20} color='yellow'/>
                        <span>{rating}/5</span>
                    </div>
                )}
                </div>
                {isPrivate && (
                    <div className="flex flex-col gap-2">
                        <button className="bg-primary text-secondary p-2 font-bold flex items-center justify-center rounded-xl w-full h-full cursor-pointer">Ver Perfil</button>
                        <button className="bg-primary text-secondary p-2 font-bold flex items-center justify-center rounded-xl w-full h-full cursor-pointer">Solicitar Servicio</button>
                    </div>
                )}
        </article>
    )
}