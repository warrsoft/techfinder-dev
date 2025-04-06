import { ROLES } from './roles.js'

export const PUBLIC_ROUTES = {
    HOME: { PATH: '/', NAME: 'Inicio' },
    LOGIN: { PATH: '/login', NAME: 'Iniciar Sesión' },
    SIGNUP: { PATH: '/signup', NAME: 'Registrarse' },
    FORGOT_PASSWORD: { PATH: '/forgot-password', NAME: 'Olvidé mi contraseña' },
    RESET_PASSWORD: { PATH: '/reset-password', NAME: 'Cambiar contraseña' }
}

export const PRIVATE_ROUTES = {
    DASHBOARD: { PATH: '/auth/dashboard', NAME: 'Portal', ROLE: [ROLES.USER, ROLES.TECH] },
    REQUESTS: { PATH: '/auth/requests', NAME: 'Mis Solicitudes', ROLE: [ROLES.USER, ROLES.TECH] },
    PROFILE: { PATH: '/auth/profile', NAME: 'Perfil', ROLE: [ROLES.USER, ROLES.TECH] },
    TECHNICIANS: { PATH: '/auth/technicians', NAME: 'Mis Trabajos', ROLE: [ROLES.TECH] }
}