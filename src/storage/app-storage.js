import { PRIVATE_ROUTES } from '../constants/routes.js';
import { supabase } from '../services/supabase.js'

const getProfessions = async () => {
    const professions = localStorage.getItem('professions');
    if (professions) {
        return JSON.parse(professions);
    }
    const { data, error } = await supabase.from('professions').select('*');
    if (error) {
        console.error('Error fetching professions:', error);
        return null;
    }
    if (data) {
        localStorage.setItem('professions', JSON.stringify(data));
    }
    return data;
}

const login = async (user) => {

    const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
    });

    if (error) {
        console.error('Error logging in:', error);
        return;
    }

    return data;
}

const signup = async (user) => {
    const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
    });

    if (error) {
        console.error('Error signing up:', error);
        return;
    }

    return data;
}

const createNewUser = async (user) => {
    const { data, error } = await supabase.from('users').insert([user]);
    if (error) {
        console.error('Error creating new user:', error);
        return;
    }
    return data;
}

const accessWithGoogle = async () => {
    const { data, error: dataError } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${import.meta.env.VITE_BASE_URL}/${PRIVATE_ROUTES.DASHBOARD}` } });

    if (dataError) {
        console.error('Error signing in with Google:', dataError);
        return null;
    }

    return data;
}

export default {
    getProfessions,
    accessWithGoogle,
    login,
    signup,
    createNewUser,
}