import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '../constants/routes.js';
import { mapperTechFromDb } from '../mappers/tech.mapper.js';
import { mapperUserFromDb } from '../mappers/user.mapper.js';
import { mapperRequestToDb, mapperRequestFromDb } from '../mappers/request.mapper.js';
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

const getRequestStatus = async () => {
    const requestsStatus = localStorage.getItem('requestsStatus');
    if (requestsStatus) {
        return JSON.parse(requestsStatus);
    }
    const { data, error } = await supabase.from('request_status').select('*');
    if (error) {
        console.error('Error fetching requests status:', error);
        return null;
    }
    if (data) {
        localStorage.setItem('requestsStatus', JSON.stringify(data));
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

const getTechById = async (techId) => {
    const techs = localStorage.getItem('techs');
    if (techs) {
        const parsedTechs = JSON.parse(techs);
        const tech = parsedTechs.find((tech) => tech.id === techId);
        if (tech) {
            return tech;
        }
    }

    const { data, error } = await supabase.from('techs').select('*').eq('id', techId).single();
    if (error) {
        console.error('Error fetching tech:', error);
        return null;
    }

    const mapperedData = mapperTechFromDb(data);

    return mapperedData;
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

const deleteRequest = async (requestId) => {
    const { data, error } = await supabase.from('requests').delete().eq('id', requestId).select('*');
    if (error) {
        console.error('Error deleting request:', error);
        return null;
    }
    return data;
}

const getRequestByUserId = async () => {

    const { data: { session } } = await supabase.auth.getSession();
    const { data, error } = await supabase.from('requests').select('id, subject, description, created_at, last_modified, status:status (id, name), user_id, tech_id (id, businessName:business_name)').eq('user_id', session.user.id).order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching requests:', error);
        return null;
    }

    const mapperedData = data.map((request) => (
        mapperRequestFromDb(request)
    ))

    return mapperedData;
}

const getRequestByTechId = async () => {;
    const { data: { session } } = await supabase.auth.getSession();
    const { data, error } = await supabase.from('requests').select('id, subject, description, created_at, last_modified, status:status (id, name), user_id, tech_id (id, businessName:business_name)').eq('tech_id', session.user.id).order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching requests:', error);
        return null;
    }

    const mapperedData = data.map((request) => (
        mapperRequestFromDb(request)
    ))

    return mapperedData;
}


const createRequest = async (request) => {
    const mapperedData = mapperRequestToDb(request);
    const { data, error } = await supabase.from('requests').insert([mapperedData]).select('*');
    if (error) {
        console.error('Error creating request:', error);
        return null;
    }
    return data;
}

const updateRequest = async (requestId, request) => {
    const mapperedData = mapperRequestToDb(request);
    console.log(mapperedData);
    const { data, error } = await supabase.from('requests').update(mapperedData).eq('id', requestId).select('*');
    if (error) {
        console.error('Error updating request:', error);
        return null;
    }
    return data;
}

const getUserById = async (userId) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

    const mapperedData = mapperUserFromDb(data);

    if (error) {
        console.error('Error fetching user:', error);
        return null;
    }
    return mapperedData;
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
    updateUser,
    getRequestByUserId,
    getRequestByTechId,
    createRequest,
    deleteRequest,
    getRequestStatus,
    updateRequest,
    getUserById,
    getTechById
}