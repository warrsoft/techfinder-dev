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


// {
//     "provider_token": "ya29.a0AeXRPp4oKpuZK6euQzK-b-n8TjRD-NNlL0KlfBmonKmKA7UAvN69nflIksWG90gvYR-T3MgT7ojafMzRDO_S9lo0E9BLOHj53E7SybSo_Ou4YO0fHN_03b92E6p_j2ycxbVwlFF0obwaz8b06W2mGKpk21TUEjsAtd4GpbFNVgaCgYKAU0SARASFQHGX2MiT15Cg5GkAqyTRnb3Y2182A0177",
//     "access_token": "eyJhbGciOiJIUzI1NiIsImtpZCI6Im5wYThmSXdaUVpxeWJZcmMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3dxanFiYnZ1ZnBqcmxib3Jhbmx1LnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI5MmMxMjczYS0xMDEyLTRmODktYjViNS00ZWNhNjg0YzU5ZmMiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzQzMzAxMjU4LCJpYXQiOjE3NDMyOTc2NTgsImVtYWlsIjoiaW5maW5pdHljb2RlMDAxQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSkZLR0llSzZtWlQ3enVEWnJ1VktlMy1qaW9FZXB1dWlOUGppMjFCalJFZHlHUVd3PXM5Ni1jIiwiZW1haWwiOiJpbmZpbml0eWNvZGUwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZ1bGxfbmFtZSI6IldhcnJlbiBBY29zdGEiLCJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYW1lIjoiV2FycmVuIEFjb3N0YSIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pGS0dJZUs2bVpUN3p1RFpydVZLZTMtamlvRWVwdXVpTlBqaTIxQmpSRWR5R1FXdz1zOTYtYyIsInByb3ZpZGVyX2lkIjoiMTEyMDIzNTc2OTUzNTcyNjAzNzEyIiwic3ViIjoiMTEyMDIzNTc2OTUzNTcyNjAzNzEyIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoib2F1dGgiLCJ0aW1lc3RhbXAiOjE3NDMyOTc2NTh9XSwic2Vzc2lvbl9pZCI6Ijc5MGJkODA0LTExMTItNGM4OS1iMTEzLTQ1YzFhNDdhNWVhMiIsImlzX2Fub255bW91cyI6ZmFsc2V9.qhubM5Ct6xZ_euw0aHjJb6TG5ZZg9g6DdDpipMsiDYE",
//     "expires_in": 3600,
//     "expires_at": 1743301258,
//     "refresh_token": "bcWrkBhd_ZDQDyfFNuz_qw",
//     "token_type": "bearer",
//     "user": {
//         "id": "92c1273a-1012-4f89-b5b5-4eca684c59fc",
//         "aud": "authenticated",
//         "role": "authenticated",
//         "email": "infinitycode001@gmail.com",
//         "email_confirmed_at": "2025-03-28T23:52:58.400024Z",
//         "phone": "",
//         "confirmed_at": "2025-03-28T23:52:58.400024Z",
//         "last_sign_in_at": "2025-03-30T01:20:58.56042Z",
//         "app_metadata": {
//             "provider": "google",
//             "providers": [
//                 "google"
//             ]
//         },
//         "user_metadata": {
//             "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJFKGIeK6mZT7zuDZruVKe3-jioEepuuiNPji21BjREdyGQWw=s96-c",
//             "email": "infinitycode001@gmail.com",
//             "email_verified": true,
//             "full_name": "Warren Acosta",
//             "iss": "https://accounts.google.com",
//             "name": "Warren Acosta",
//             "phone_verified": false,
//             "picture": "https://lh3.googleusercontent.com/a/ACg8ocJFKGIeK6mZT7zuDZruVKe3-jioEepuuiNPji21BjREdyGQWw=s96-c",
//             "provider_id": "112023576953572603712",
//             "sub": "112023576953572603712"
//         },
//         "identities": [
//             {
//                 "identity_id": "87969cff-8d67-4d37-ae12-57743a49f910",
//                 "id": "112023576953572603712",
//                 "user_id": "92c1273a-1012-4f89-b5b5-4eca684c59fc",
//                 "identity_data": {
//                     "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocJFKGIeK6mZT7zuDZruVKe3-jioEepuuiNPji21BjREdyGQWw=s96-c",
//                     "email": "infinitycode001@gmail.com",
//                     "email_verified": true,
//                     "full_name": "Warren Acosta",
//                     "iss": "https://accounts.google.com",
//                     "name": "Warren Acosta",
//                     "phone_verified": false,
//                     "picture": "https://lh3.googleusercontent.com/a/ACg8ocJFKGIeK6mZT7zuDZruVKe3-jioEepuuiNPji21BjREdyGQWw=s96-c",
//                     "provider_id": "112023576953572603712",
//                     "sub": "112023576953572603712"
//                 },
//                 "provider": "google",
//                 "last_sign_in_at": "2025-03-28T23:52:58.389563Z",
//                 "created_at": "2025-03-28T23:52:58.389611Z",
//                 "updated_at": "2025-03-30T01:20:58.555045Z",
//                 "email": "infinitycode001@gmail.com"
//             }
//         ],
//         "created_at": "2025-03-28T23:52:58.375254Z",
//         "updated_at": "2025-03-30T01:20:58.563541Z",
//         "is_anonymous": false
//     }
// }