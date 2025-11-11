import User from '../models/User.js';
import { NotFoundError, BusinessError } from '../middlewares/errorHandler.js';

//Obtener todos los usuarios

export const getAllUsersService = async () => {
    const users = await User.find({ isActive: true }).select('-password');
    return{
        count: users.length,
        users: users
    };
};


//Obtener usuarios por ID

export const getUserByIdService = async (id) => {
    const user = await User.findById(id).select('-password');

    if(!user || !user.isActive){
        throw new NotFoundError ('Usuario', id);
    }
    return user;
};


//Crear usuarios nuevos

export const createUserService = async (userData) => {
    const { name, email, password, role = 'user'} = userData;

    //Verificar si ya existe el usuario con ese email
    const existingUser = await User.findOne({
        email: email.toLowerCase()
    });

    if(existingUser){
        throw new BusinessError ('Ya existe un usuario con ese email', 409);
    }

    const newUser = new User({
        name,
        email: email.toLowerCase(),
        password, // La contraseña debe venir hasheada
        role,
        isActive: true
    });

    await newUser.save();

    // Retornar sin contraseña
    const userObject = newUser.toObject();
    delete userObject.password;
    return userObject;
}


//Actualizar usuario

export const updateUserService = async (id, updateData) => {
    const user = await User.findById(id);

    if(!user || !user.isActive){
        throw new NotFoundError('Usuario', id);
    }

    //Si actualiza el mail verifica que no exista
    if(updateData.email){
        const existingUser = await User.findOne({
            email: updateData.email.toLowerCase(),
            _id: { $ne: id }
        });
        if(existingUser) {
            throw new BusinessError('Ya existe otro usuario con ese email', 409);
        }
    }

    Object.assign(user, updateData);
    await user.save();

    // Retornar sin contraseña
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

//ELIMINAR USUARIO (Soft Delete)

export const deleteUserService = async (id) => {
    const user = await User.findById(id);

    if(!user || !user.isActive){
        throw new NotFoundError('Usuario', id);
    }

    //No se pueden eliminar roles de administradores
    if(user.role === 'admin'){
        throw new BusinessError('No se puede eliminar un usuario con el rol de Administrador', 403);
    }

    // Soft delete: marcamos como inactivo
    user.isActive = false;
    await user.save();

    // Retornar sin contraseña
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}