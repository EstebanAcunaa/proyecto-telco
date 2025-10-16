import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    updateUser,
} from '../handlers/usersHandlers.js';

const Router = Router();

//GET -- Obtener todos los usuarios

router.get('/', getAllUsers);

// Obtener los usuarios por ID

router.get('/:id', getUserById);


// Crear un usuario nuevo

router.post('/', createUser);

// Actualizar un usuario 

router.put('/:id', updateUser);

//Eliminar un usuario

router.delete('/:id', deleteUser);


export default router;