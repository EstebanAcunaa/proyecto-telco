export class NotFoundError extends Error{
    constructor(resource, id) {
        super(`${resource} con ID ${id} no encontrado`);
        this.statusCode = 404;
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends Error {
    constructor(message){
        super(message);
        this.statusCode = 400;
        this.name = 'ValidationError';
    }
}

export class BusinessError extends Error{
    constructor(message, statusCode = 400){
        super(message);
        this.statusCode = statusCode;
        this.name = 'BusinessError';
    }
}

// Middleware principal para el manejo de errores

export const errorHandler = (err, req, res, next) =>{
    console.error('Error capturado', err);

    //error de validacion usando JOI

    if(err.isJoi){
        return res.status(400).json({
            error: 'Error de validacion',
            details: err.details.map(detail =>({
                field: detail.path.join('.'),
                message: detail.message
            }))
        });
    }

     // Error personalizado

     if(err instanceof NotFoundError || err instanceof ValidationError || err instanceof BusinessError){
        return res.status(err.statusCode).json({
            error: err.message
        });
     }

     //Error generico del servidor

     res.status(500).json({
        error: 'Error interno del servidor',
        message: err.message
     });

};

export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.path
    });
};