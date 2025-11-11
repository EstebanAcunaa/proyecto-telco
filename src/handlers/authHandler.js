import { registerService, loginService, getProfileService } from "../services/authService.js";

//--------Registro

export const register = async (req, res, next) => {
    try{
        const result = await registerService(req.body);
        
        res.status(201).json({
            message: 'Usuario registrado con exito',
            data: result
        });
    } catch(error){
        next(error);
    }
};

// ------------------ LOGIN
export const login = async (req, res, next) => {
    try{
        const result = await loginService(req.body);

        res.status(200).json({
            message: 'Usuario logeado con exito',
            data: result
        });
    } catch(error){
        next(error);
    }
};

//--------- OBTENER PERFIL

export const getProfile = async (req, res, next) => {
    try{
        //req.user viene del middleware de autenticación
        const user = await getProfileService(req.user.id);

        res.status(200).json({
            message: 'Perfil obtenido con exito',
            data: user
        });
    }catch(error){
        next(error);
    }
};