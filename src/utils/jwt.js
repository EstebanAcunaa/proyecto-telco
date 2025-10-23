import { JsonWebTokenError } from "jsonwebtoken";
import { token } from "morgan";

const JWT_SECRET = process.env.JWT_SECRET || 'secret_por_Defecto_cambiar';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7D';

// GENERAR TOKEN JWT

export const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
};

// VERIFICAR EL TOKEN

export const verifyToken = (token) => {
    try{
        return jwt.verify(token, JWT_SECRET);
    }catch(error){
        throw new Error('Token invalido');
    }
};

