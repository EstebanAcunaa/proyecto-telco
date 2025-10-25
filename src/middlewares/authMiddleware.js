import { verifyToken } from "../utils/jwt.js";

//VERIFICAR QUE EL USUARIO ESTA AUTENTICADO

export const authenticate = (req, res, next) => {
    try{
        //Obtener el token del header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                error: 'No autorizado. Token no proporcionado'
            });
        }

        //EXTRAER EL TOKEN

        const token = authHeader.split(' ')[1];

        //Verificar el token

        const decoded = verifyToken(token);

        //Agregar informacion del usuario al request

        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            error: 'Token invalido o expirado'
        });
    }
};


//VERIFICAR LOS ROLES 

export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({
                error: 'No autorizado'
            });
        }

        if (!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                error: 'Acceso denegado. No tienes permisos suficientes'
            });
        }

        next();
    };
};