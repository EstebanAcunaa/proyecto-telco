import bcrypt from "bcryptjs";
import {database, getNextId } from '../database/db.js';
import { generateToken } from "../utils/jwt.js";
import {BusinessError, NotFoundError } from '../middlewares/errorHandler.js';

//Registro de usuario

export const registerService = async (userData) => {
    const {name, email, password, role = 'user'} = userData;

    //verificar si el mail ya existe

    const existingUser = database.users.find(
        u => u.email.toLowerCase() === email.toLowerCase()
    );

    if(existingUser){
        throw new BusinessError('El mail ya se encuentra registrado', 409);
    }

    //Hashear la pass

    const hashedPassword = await bcrypt.hash(password, 10);

    //Crear un nuevo usuario

    const newUser = {
        id: getNextId('users'),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
        createdAt: new Date()
    };

    database.users.push(newUser);

    //Generar token

    const token = generateToken({
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
    });

    //No devolver la pass

    const {password: _, ...userWithoutPassword} = newUser;
    return{
        user: userWithoutPassword,
        token
    };
};

//Login de usuario

export const loginService = async (credentials) => {
    const {email, password} = credentials;

    //buscar usuario por email
    const user = database.users.find(
        u => u.email.toLowerCase() === email.toLowerCase()
    );
    if(!user){
        throw new NotFoundError('Usuario', email);
    }

    //Verificar contra

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        throw new BusinessError('Contraseña incorrecta', 401);
    }

    //Generar token

    const token = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
    });


    //No devolver la contra

    const { password: _, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token
    };
};

//Obtener perfil

export const getProfileService = (userId) => {
    const user = database.users.find(u => u.id === parseInt(userId));

    if(!user){
        throw new NotFoundError ('Usuario', userId);
    }

    //No devolver la contra 
    const {password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};