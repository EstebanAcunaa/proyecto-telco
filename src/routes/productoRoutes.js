import { Router } from "express";

import{
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../handlers/productosHandlers.js';

const router = Router();

//GET API/products - Obtener todos los productos

router.get('/', getAllProducts);

//GET api/products/:id - Obtener los productos por ID

router.get('/', getProductById);

//Post /api/products - Crear un producto nuevo 

router.post('/', createProduct);

//DELETE /api/products - Eliminar un producto 

router.delete('/', deleteProduct);

//PUT /api/products - Actualizar un producto

router.put('/', updateProduct);

export default router;