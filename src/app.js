import express from 'express';
import morgan from 'morgan';
import productoRoutes from './routes/productoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';


const app = express();

// Middlewares globales
app.use(express.json());
app.use(morgan('dev'));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🛍️ Bienvenido al E-commerce API',
    version: '2.0.0',
    status: 'active',
    endpoints: {
      products: '/api/products',
      auth: '/api/auth'
    }
  });
});

//Rutas api
app.use('/api/products', productoRoutes);
app.use('/api/auth', authRoutes);

//MIDDLEWARE rutas no encontradas
app.use(notFoundHandler);
//MIDDLEWARE manejo de errores
app.use(errorHandler);


export default app;