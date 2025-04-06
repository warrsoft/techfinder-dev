export function Button ({ model = 'light', size, text, handleClick, className }) {

    const buttonBg = model == 'dark' ? 'text-secondary bg-primary' : 'text-primary bg-secondary'

    const buttonSize = size ? size : 'w-max'

    let buttonClass = 'flex items-center justify-center p-4 font-bold shadow-md cursor-pointer rounded-lg sm:text-lg' + ' ' + buttonBg + ' ' + buttonSize

    return (
        <button onClick={handleClick} className={`${buttonClass} ${className}`}>
            { text }
        </button>
    )
}