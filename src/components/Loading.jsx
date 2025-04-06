export function Loading () {
return (
        <div className="flex justify-center items-center h-screen w-full bg-light">
            <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                <path d="M12 6v6l4.5 2.25L16.5 14l-4.5-2V6z" fill="currentColor"/>
            </svg>
        </div>
    )
}