import express from 'express';
import morgan from 'morgan';

const app = express();

// Middlewares globales
app.use(express.json());
app.use(morgan('dev'));

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🛍️ Bienvenido al E-commerce API',
    version: '2.0.0',
    status: 'active'
  });
});

export default app;