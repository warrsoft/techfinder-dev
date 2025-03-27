import { ReactIcons } from "./ReactIcons";

export function TechnicalCard ({ avatar, name, profession, rating }) {

    if(!name) return null

    return (
        <article className="flex items-center justify-center gap-4 p-4 bg-white shadow-md rounded-xl w-[300px]">
            <div>
                <img className="rounded-[50%] w-30" src={avatar} alt={name} />
            </div>
            <div>
                <h3 className="font-bold text-xl">{name}</h3>
                <p>{profession}</p>
                <div className="flex items-center gap-2">
                    <ReactIcons name='star' size={20} color='yellow'/>
                    <span>{rating}/5</span>
                </div>
            </div>
        </article>
    )
}