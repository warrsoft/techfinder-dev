import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../constants/routes.js';
import { mapperTechFromDb } from '../mappers/tech.mapper.js';
import { mapperUserFromDb } from '../mappers/user.mapper.js';
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

const getProvinces = async () => {
    const provinces = localStorage.getItem('provinces');
    if (provinces) {
        return JSON.parse(provinces);
    }
    const { data, error } = await supabase.from('provinces').select('*');
    if (error) {
        console.error('Error fetching provinces:', error);
        return null;
    }
    if (data) {
        localStorage.setItem('provinces', JSON.stringify(data));
    }
    return data;
}

const getTechs = async () => {
    const techs = localStorage.getItem('techs');
    if (techs) {
        return JSON.parse(techs);
    }
    const { data, error } = await supabase.from('techs').select('*');
    if (error) {
        console.error('Error fetching techs:', error);
        return null;
    }
    if (data) {
        data.map((tech) => {
            tech.geo_location = JSON.parse(tech.geo_location[0])
            tech.professions = tech.professions.map((profession) => {
                return JSON.parse(profession)
            })
            tech.services = tech.services.map((service) => {
                return JSON.parse(service)
            })
        })

        const mapperedData = data.map((tech) => {
            return mapperTechFromDb(tech);
        })

        localStorage.setItem('techs', JSON.stringify(mapperedData));
        
        return mapperedData;
    }

    return null;
}

const logIn = async (user) => {
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

const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Error signing out:', error);
        return;
    }
    localStorage.clear();
    return true;
}

const getSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error('Error getting session:', error);
        return;
    }
    return data.session;
}

const getCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const { data, error } = await supabase.from('users').select('*').eq('id', session.user.id).single();
    if (error) {
        console.error('Error fetching user:', error);
        return;
    }

    if (!data) {
        return null;
    }

    const mapperedData = mapperUserFromDb(data);

    return mapperedData;
}

const signUp = async (user) => {

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
    const { data, error } = await supabase.from('users').insert([user]).select('*');
    if (error) {
        console.error('Error creating new user:', error);
        return;
    }
    return data;
}

const updateUser = async (user) => {
    const { data, error } = await supabase.from('users').update(user).eq('id', user.id);
    if (error) {
        console.error('Error updating user:', error);
        return;
    }
    return data;
}

const createNewTech = async (user, business) => {
    const { data: dataUser, error: errorUser } = await supabase.from('users').insert([user]);
    if (errorUser) {
        console.error('Error creating new user:', errorUser);
        return;
    }

    const { data: dataTech, error: errorTech } = await supabase.from('techs').insert([business]);

    if (errorTech) {
        console.error('Error creating new tech:', errorTech);
        return;
    }

    return [dataUser, dataTech];
}

const getRandomAvatar = () => {
  const randomNumber = Math.floor(Math.random() * 20) + 1;
  const { data, error } = supabase
    .storage
    .from('avatars')
    .getPublicUrl(`avatar-${randomNumber}.webp`);

  if (error) {
    console.error('Error fetching random avatar:', error);
    return null;
  }

  return data.publicUrl;
};

const accessWithGoogle = async () => {
    const redirectTo = `${import.meta.env.VITE_BASE_URL}${PRIVATE_ROUTES.DASHBOARD.PATH}`;
    const { data, error: dataError } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: redirectTo} });

    if (dataError) {
        console.error('Error signing in with Google:', dataError);
        return null;
    }

    return data;
}

export default {
    getProfessions,
    accessWithGoogle,
    logIn,
    signUp,
    createNewUser,
    createNewTech,
    getCurrentUser,
    getProvinces,
    getSession,
    signOut,
    getRandomAvatar,
    getTechs,
    updateUser
}