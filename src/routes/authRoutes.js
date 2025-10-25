import express from 'express';
import { register, login, getProfile } from '../handlers/authHandler.js';
import { registerValidator, loginValidator } from '../validators/authValidator.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

//Rutas publicas
router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

//Rutas protegidas
router.get('/profile', authenticate, getProfile);

export default router;