import { randomColor } from "../utils/random-color"

export function ProfessionPil ({ profession }) {
    return (
        <article className={"flex items-center justify-center shadow-md rounded-xl font-bold w-fit p-1 px-2" + ' ' + randomColor()}>
            { profession }
        </article>
    )
}