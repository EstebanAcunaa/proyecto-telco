import Joi from "joi";

// Validador del registro

export const registerValidator = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.empty': 'El nombre es requerido',
            'string.min': 'El nombre debe tener al menos 3 caracteres',
            'string.max': 'El nombre no puede exceder 50 caracteres',
        }),

        email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'El email es requerido',
            'string.email': 'Debe ser un mail valido'
        }),

        password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.empty': 'La contraseña es requerida',
            'string.min': 'La contraseña debe tener al menos 6 caracteres'
        }),

        role: Joi.string()
        .valid('user', 'admin')
        .default('user')
        .messages({
            'any.only': 'El rol debe ser "User" o "Admin" '
        })
    });

    const { error } = schema.validate(req.body);

    if(error){
        return res.status(400).json({
            error: 'Error de validacion', 
            details: error.details[0].message
        });
    }
    next();
};

//Validar el login

export const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
        .email()
        .required()
        .messages({
            'string.empty': 'El email es requerido',
            'string.email': 'Debe ser un email valido'
        }),

        password: Joi.string()
        .required()
        .messages({
            'string.empty': 'La contraseña es requerida'
        })
    });

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).json({
            error: 'Error de validacion',
            details: error.details[0].message
        });
    }
    next();
};