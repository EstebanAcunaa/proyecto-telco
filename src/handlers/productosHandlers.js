import * as productController from '../controllers/productsControllers.js';
import {
    createProductSchema,
    updateProductSchema,
    idSchema
} from '../validators/productValidator.js';

//GET -- OBTENER TODOS LOS PRODUCTOS

export const getAllProducts = async (req, res, next) => {
    try {
        const result = await productController.getAllProductsService();

        res.status(200).json({
            message: 'Lista de productos obtenida',
            ...result
        });
    } catch (error){
        next(error);
    }
};

// GET -- Obtener un producto por ID

export const getProductById = async (req, res, next) => {
    try {
        const {id} = req.params;

        //Validar ID con Mongoose ObjectId (string de 24 caracteres hexadecimales)
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error('ID de producto inválido');
        }

        const product = await productController.getProductByIdService(id);

        res.status(200).json({
            message: 'Producto encontrado',
            data: product
        });
    } catch(error){
        next(error);
    }
};


// POST CREAR UN PRODUCTO NUEVO

export const createProduct = async (req, res, next) => {
    try{
        //Validar los datos del body
        const validatedData = await createProductSchema.validateAsync(req.body);

        const newProduct = await productController.createProductService(validatedData);

        res.status(201).json({
            message: 'Producto creado exitosamente',
            data: newProduct
        });
    } catch(error){
        next(error);
    }
};


//PUT ACTUALIZAR LOS PRODUCTOS

export const updateProduct = async (req, res, next) => {
    try{
        const {id} = req.params;

        //Validar ID con Mongoose ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error('ID de producto inválido');
        }

        //validar datos del body
        const validatedData = await updateProductSchema.validateAsync(req.body);

        const updatedProduct = await productController.updateProductService(id, validatedData);

        res.status(200).json({
            message: 'Producto actualizado correctamente',
            data: updatedProduct
        });
    }
    catch(error){
        next(error);
    }
};



// DELETE -- ELIMINAR UN PRODUCTO

export const deleteProduct = async (req, res, next) => {
    try{
        const {id} = req.params;

        //Validar ID con Mongoose ObjectId
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            throw new Error('ID de producto inválido');
        }

        const deletedProduct = await productController.deleteProductService(id);

        res.status(200).json({
            message: 'Producto eliminado exitosamente',
            data: deletedProduct
        });
    }catch(error){
        next(error);
    }
};