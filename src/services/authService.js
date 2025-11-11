import bcrypt from "bcryptjs";
import User from '../models/User.js';
import { generateToken } from "../utils/jwt.js";
import {BusinessError, NotFoundError } from '../middlewares/errorHandler.js';

//Registro de usuario

export const registerService = async (userData) => {
    const {name, email, password, role = 'user'} = userData;

    //verificar si el mail ya existe
    const existingUser = await User.findOne({
        email: email.toLowerCase()
    });

    if(existingUser){
        throw new BusinessError('El mail ya se encuentra registrado', 409);
    }

    //Hashear la pass
    const hashedPassword = await bcrypt.hash(password, 10);

    //Crear un nuevo usuario
    const newUser = new User({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
        isActive: true
    });

    await newUser.save();

    //Generar token
    const token = generateToken({
        id: newUser._id.toString(),
        email: newUser.email,
        role: newUser.role
    });

    //No devolver la pass
    const userObject = newUser.toObject();
    delete userObject.password;

    return{
        user: userObject,
        token
    };
};

//Login de usuario

export const loginService = async (credentials) => {
    const {email, password} = credentials;

    //buscar usuario por email (incluyendo password que normalmente está excluido)
    const user = await User.findOne({
        email: email.toLowerCase(),
        isActive: true
    }).select('+password');

    if(!user){
        throw new NotFoundError('Usuario', email);
    }

    //Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new BusinessError('Contraseña incorrecta', 401);
    }

    //Generar token
    const token = generateToken({
        id: user._id.toString(),
        email: user.email,
        role: user.role
    });

    //No devolver la contraseña
    const userObject = user.toObject();
    delete userObject.password;

    return {
        user: userObject,
        token
    };
};

//Obtener perfil

export const getProfileService = async (userId) => {
    const user = await User.findById(userId).select('-password');

    if(!user || !user.isActive){
        throw new NotFoundError ('Usuario', userId);
    }

    return user;
};