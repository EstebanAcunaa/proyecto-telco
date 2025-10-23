import Joi  from "joi";

//Schema para crear un producto


export const createProductSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
        'string.empty': 'El nombre del producto es obligatorio',
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre no puede exceder los 100 caracteres',
        'any.required': 'El nombre es obligatorio'
    }),

    category: Joi.string()
     .valid('zapatillas', 'ropa', 'perfumes')
     .required()
     .messages({
        'any.only': 'La categoria debe ser: zapatillas, ropa o perfumes',
        'any.required': 'La categoria es obligatoria'
     }),

     price: Joi.number()
     .positive()
     .required()
     .messages({
        'number.base': 'El precio debe ser un numero',
        'number.positive': 'El precio debe ser mayor a 0',
        'any.required': 'El precio es obligatorio'
     }),

     stock: Joi.number()
     .integer()
     .min(0)
     .required()
     .messages({
        'number.base': 'El stock debe ser un numero',
        'number.integer': 'El stock debe ser un numero entero',
        'number.min': 'El stock no puede ser negativo',
        'any.required': 'El stock es obligatorio'
     }),

     brand: Joi.string()
     .optional()
     .messages({
        'string.base': 'La marca debe ser texto'
     })
});


// Schema para actualizar los productos

export const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(100).optional(),
    category: Joi.string().valid('zapatillas', 'ropa', 'perfumes').optional(),
    price: Joi.number().positive().optional(),
    stock: Joi.number().integer().min(0).optional(),
    brand: Joi.string().optional()
}).min(1).messages({
    'object.min': 'Debe proporcionar al menos un campo para actualizar'
});


//Schema para validar el ID

export const idSchema = Joi.number()
.integer()
.positive()
.required()
.messages({
    'number.base': 'El ID debe ser un numero',
    'number.integer': 'El ID debe ser un numero entero',
    'number.positive': 'El ID debe ser positivo'
});