import { supabase } from "../../services/supabase"

export function DashboardPage () {

    const handleSignup = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error('Error signing out:', error.message)
        } else {
            console.log('Signed out successfully')
        }
    }

    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={handleSignup}>Cerrar Sesión</button>
        </>
    )
}