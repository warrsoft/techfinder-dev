import { z } from 'zod';

const userProfileValidation = z.object({
    name: z.string().nonempty('El nombre es requerido'),
    lastName: z.string().nonempty('El apellido es requerido'),
    phone: z.string().nonempty('El teléfono es requerido').regex(/^\d+$/, 'El teléfono solo puede contener números'),
    userName: z.string().nonempty('El nombre de usuario es requerido').regex(/^[a-zA-Z0-9]+$/, 'El nombre de usuario solo puede contener letras y números'),
    email: z.string().email('El correo electrónico no es válido').nonempty('El correo electrónico es requerido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').nonempty('La contraseña es requerida'),
    confirmPassword: z.string().min(6, 'La confirmación de contraseña debe tener al menos 6 caracteres').nonempty('La confirmación de contraseña es requerida'),
    role: z.number().default(1),
    avatarUrl: z.string().optional(),
})

const techProfileValidation = z.object({
    name: z.string().nonempty('El nombre es requerido'),
    lastName: z.string().nonempty('El apellido es requerido'),
    userName: z.string().nonempty('El nombre de usuario es requerido').regex(/^[a-zA-Z0-9]+$/, 'El nombre de usuario solo puede contener letras y números'),
    email: z.string().email('El correo electrónico no es válido').nonempty('El correo electrónico es requerido'),
    phone: z.string().nonempty('El teléfono es requerido').regex(/^\d+$/, 'El teléfono solo puede contener números'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').nonempty('La contraseña es requerida'),
    confirmPassword: z.string().min(6, 'La confirmación de contraseña debe tener al menos 6 caracteres').nonempty('La confirmación de contraseña es requerida'),
    avatarUrl: z.string().optional(),
    businessName: z.string().nonempty('El nombre de la empresa es requerido'),
    businessPhone: z.string().nonempty('El teléfono de la empresa es requerido').regex(/^\d+$/, 'El teléfono solo puede contener números'),
    professions: z.array(z.object({
        id: z.number().nonnegative('La profesión es requerida'),
        name: z.string().nonempty('La profesión es requerida')
    })).nonempty('La profesión es requerida'),
    services: z.array(z.object({
        name: z.string().nonempty('El servicio es requerido'),
    })).optional(),
    province: z.string().nonempty('La provincia es requerida'),
    sector: z.string().nonempty('El sector es requerido'),
    location: z.array(z.object({
        lat: z.number(),
        lng: z.number()
    })),
    role: z.number().default(2),
})

const requestValidation = z.object({
    subject: z.string().nonempty('El asunto es requerido'),
    description: z.string().nonempty('La descripción es requerida'),
    techId: z.string().nonempty('El técnico es requerido'),
    statusId: z.number().default(1),
    userId: z.string(),
})

export const validateUserForm = (formData) => {
    return userProfileValidation.safeParse(formData)
}

export const validatePartialUserForm = (formData) => {
    return userProfileValidation.partial().safeParse(formData)
}

export const validateTechForm = (formData) => {
    return techProfileValidation.safeParse(formData)
}

export const validatePartialTechForm = (formData) => {
    return techProfileValidation.partial().safeParse(formData)
}

export const validateRequestForm = (formData) => {
    return requestValidation.safeParse(formData)
}
