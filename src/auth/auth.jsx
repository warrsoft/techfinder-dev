import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router";
import Storage from "../storage/app-storage.js";
import { supabase } from "../services/supabase.js";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const initAuth = async () => {
            const session = await Storage.getSession();

            if(session) {
                setSession(session);

                const user = await Storage.getCurrentUser();

                if(user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
            } else {
                setSession(null);
            }

            setLoading(false);
        };

        initAuth();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if(event === 'SIGNED_IN') {
                setSession(session.user);
            } else if(event === 'SIGNED_OUT') {
                setSession(null);
                setUser(null);
            }
            setLoading(false);
        })

        return () => {
            subscription.unsubscribe();
        }

    }, [navigate])

    return (
        <AuthContext.Provider value={{ user, session, loading}}>
            { children }
        </AuthContext.Provider>
    );
};