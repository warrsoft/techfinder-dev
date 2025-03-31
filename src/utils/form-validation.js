import { z } from 'zod';

const formValidationSchema = z.object({
    email: z.string().email('El correo electrónico no es válido').nonempty('El correo electrónico es requerido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres').nonempty('La contraseña es requerida'),
    confirmPassword: z.string().min(6, 'La confirmación de contraseña debe tener al menos 6 caracteres').nonempty('La confirmación de contraseña es requerida')
});

export const validateForm = (formData) => {
    return formValidationSchema.safeParse(formData)
}

export const validatePartialForm = (formData) => {
    return formValidationSchema.partial().safeParse(formData)
}
