import { Icons } from "../constants/react-icons";

export function ReactIcons ({ name, iconClass, onClick, size, color }) {

    const IconComponent = Icons[name]

    if(!IconComponent) return `Icons ${name} not found`

    return <figure onClick={onClick} className={iconClass}><IconComponent size={size} color={color} /></figure>

}