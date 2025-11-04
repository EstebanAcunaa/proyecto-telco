import * as userController from '../controllers/userControllers.js';
import {
    createUserSchema,
    updateUserSchema,
    idSchema
} from '../validators/userValidator.js';


//GET -- OBTENER LOS USUARIOS

export const getAllUsers = async (req, res, next) => {
    try{
        const result = await userController.getAllUsersService();

        res.status(200).json({
            message: 'Lista de usuarios obtenida exitosamente',
            ...result
        });
    }catch(error){
        next(error);
    }
};


//GET --OBTENER LOS USUARIOS POR ID

export const getUserById = async (req, res, next) => {
    try{
        const {id} = req.params;

        //Validar ID con Mongoose ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error('ID de usuario inválido');
        }

        const user = await userController.getUserByIdService(id);

        res.status(200).json({
            message: 'Usuario encontrado',
            data: user
        });
    }catch(error){
        next(error);
    }
};


//POST -- CREAR USUARIO NUEVO

export const createUser = async (req, res, next) => {
    try{
        //Validar datos del body
        const validatedData = await createUserSchema.validateAsync(req.body);

        const newUser = await userController.createUserService(validatedData);

        res.status(201).json({
            message: 'Usuario creado con exito',
            data: newUser
        });
    }catch(error){
        next(error);
    }
};

//PUT ACTUALIZAR UN USUARIO

export const updateUser = async (req, res, next) => {
    try{
        const {id} = req.params;

        //Validar ID con Mongoose ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error('ID de usuario inválido');
        }

        //Validar datos del body
        const validatedData = await updateUserSchema.validateAsync(req.body);

        const updatedUser = await userController.updateUserService(id, validatedData);

        res.status(200).json({
            message: 'Usuario actualizado correctamente',
            data: updatedUser
        });
    }catch(error){
        next(error);
    }
};


//DELETE -- ELIMINAR UN USUARIO

export const deleteUser = async (req, res, next) => {
    try{
        const {id} = req.params;

        //Validar ID con Mongoose ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error('ID de usuario inválido');
        }

        const deletedUser = await userController.deleteUserService(id);

        res.status(200).json({
            message: 'Usuario eliminado exitosamente',
            data: deletedUser
        });
    }catch(error){
        next(error);
    }
};