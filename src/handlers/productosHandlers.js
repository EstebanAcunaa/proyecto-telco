import * as productController from '../controllers/productsControllers.js';
import {
    createProductSchema,
    updateProductSchema,
    idSchema
} from '../validators/productValidator.js';

//GET -- OBTENER TODOS LOS PRODUCTOS

export const getAllProducts = async (req, res, next) => {
    try {
        const result = productController.getAllProductsService();

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

        //Validar ID 
        await idSchema.validateAsync(parseInt(id));

        const product = productController.getAllProductsService(id);

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

        const newProduct = productController.createProductService(validatedData);

        res.status(200).json({
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

        //validar la id

        await idSchema.validateAsync(parseInt(id));

        //validar datos del body

        const validatedData = await updateProductSchema.validateAsync(req.body);

        const updateProduct = productController.updateProductService(id, validatedData);

        res.status(200).json({
            message: 'Producto actualizado correctamente',
            data: updateProduct
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

        //validar id
        await idSchema.validateAsync(parseInt(id));

        const deletedProduct = productController.deleteProductService(id);

        res.status(200).json({
            message: 'Producto eliminado exitosamente',
            data: deletedProduct
        });
    }catch(error){
        next(error);
    }
};