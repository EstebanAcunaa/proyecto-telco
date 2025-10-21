import Joi from "joi";

//Schema para crear un usuario


export const createUserSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
        'string.empty': 'El nombre es obligatorio',
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre no puede exceder los 100 caracteres',
        'any.required': 'El nombre es obligatorio'
    }),

    email: Joi.string()
    .email()
    .required()
    .messages({
        'string.empty': 'El email es obligatorio',
        'string.email': 'Debe proporcionar un mail valido',
        'any.required': 'El email es obligatorio'
    }),

    role: Joi.string()
    .valid('admin', 'user')
    .default('user')
    .messages({
        'any.only': 'El rol debe ser de "admin" o "user" '
    })
});



//Actualizar un usuario

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid('admin', 'user').optional()
}).min(1).messages({
    'object.min': 'Debe proporcionar al menos un campo para actualizar'
});

//Validar el ID

export const idSchema = Joi.number()
.integer()
.positive()
.required()
.messages({
    'number.base': 'El ID debe ser un numero',
    'number.integer': 'El ID debe ser un numero entero',
    'number.positive': 'El ID debe ser positivo',
});