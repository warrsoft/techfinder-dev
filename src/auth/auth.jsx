import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { supabase } from "../services/supabase";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        }

        getSession();

        const { data: { subscription }} = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session?.user ?? null)
            } else if (event === 'SIGNED_OUT') {
                setUser(null)
                window.location.reload()
            } else if (event === 'TOKEN_REFRESHED') {
                setUser(session?.user ?? null)
            }
            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, loading}}>
            { children }
        </AuthContext.Provider>
    );
};