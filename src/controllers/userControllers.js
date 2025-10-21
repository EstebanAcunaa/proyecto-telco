import { parse } from 'dotenv';
import {database, getNextId} from '../database/db.js';
import { NotFoundError, BusinessError } from '../middlewares/errorHandler.js';

//Obtener todos los usuarios

export const getAllUsersService = () => {
    return{
        count: database.users.length,
        users: database.users
    };
};


//Obtener usuarios por ID

export const getUserByIdService = (id) => {
    const user = database.users.find(u => u.id === parseInt(id));

    if(!user){
        throw new NotFoundError ('Usuario', id);
    }
    return user;
};


//Crear usuarios nuevos

export const createUserService = (userData) => {
    const { name, email, role = 'user'} = userData;

    //Verificar si ya existe el usuario con ese email

    const existingUser = database.users.find(
        u => u.email.toLowerCase() === email.toLowerCase()
    );

    if(existingUser){
        throw new BusinessError ('Ya existe un usuario con ese email', 409);
    }

    const newUser = {
        id: getNextId('users'),
        name,
        email: email.toLowerCase(),
        role,
        createdAt: new Date()
    };

    database.users.push(newUser);
    return newUser;
}


//Actualizar usuario

export const updateUserService = (id, updateData) => {
    const userIndex = database.users.findIndex(u => u.id === parseInt(id));

    if(userIndex === -1){
        throw new NotFoundError('Usuario', id);
    }

    //Si actualiza el mail verifica que no exista

    if(updateData.email){
        const existingUser = database.users.find(
            u => u.email.toLowerCase() === updateData.email.toLowerCase() && u.id !== parseInt(id)
        );
        if(existingUser) {
            throw new BusinessError('Ya existe otro usuario con ese email', 409);
        }
    }

    database.users[userIndex] = {
        ...database.users[userIndex],
        ...updateData,
        updateAt: new Date()
    };

    return database.users[userIndex];
};

//ELIMINAR USUARIO

export const deleteUserService = (id) => {
    const userIndex = database.users.findIndex(u => u.id === parseInt(id));

    if(userIndex === -1){
        throw new NotFoundError('Usuario', id);
    }

    const user = database.users[userIndex];

    //No se pueden eliminar roles de administradores

    if(user.role === 'admin'){
        throw new BusinessError('No se puede eliminar un usuario con el rol de Administrador', 403);
    }
    const deletedUser = database.users[userIndex];
    database.users.splice(userIndex, 1);

    return deletedUser;
}