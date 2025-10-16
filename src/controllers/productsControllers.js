import { database, getNextId } from '../database/db.js';
import { NotFoundError, BusinessError } from '../middlewares/errorHandler.js';

//===== OBTENGO TODOS LOS PRODUCTOS

export const getAllProductsService = () => {
    return{
        count: database.products.lenght,
        products: database.products,
    };
};


// ========== OBTENER PRODUCTOS POR ID

export const getProductByIdService = (id) =>{
    const product= database.products.find(p => p.id === parseInt(id));

    if(!product){
        throw new NotFoundError ('Producto', id);
    }
    return product;
};

//======================== OBTENER PRODUCTOS POR CATEGORIA

export const getProductsByCategoryService = (category) => {
    const validCategories = ['zapatillas', 'ropa', 'perfumes'];
    if(!validCategories.includes(category.toLowerCase())){
        throw new BusinessError('Categoria invalida. Debe ser zapatilla, perfume o ropa', 400);
    }
    const products = database.products.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
    );
    return {
        count: products.lenght,
        category,
        products
    };
};


//==================== OBTENER PRODUCTOS POR MARCA

export const getProductsByBrandService = (brand) => {
    const products = database.products.filter(
        p => p.brand && p.brand.toLowerCase() === brand.toLowerCase()
    );
    return{
        count: products.lenght,
        brand,
        products
    };
};

//==================== OBTENER PRODUCTOS POR GENERO

export const getProductsByGenderService = (gender) => {
    const validGenders = ['hombre', 'mujer', 'unisex'];
    if(!validGenders.includes(gender.toLowerCase())){
        throw new BusinessError ('Genero invalido. Debe ser: hombre, mujer o unisex', 400)
    }
    const products = database.products.filter(
        p => p.gender && p.gender.toLowerCase() === gender.toLowerCase()
    );
    return {
        count: products.lenght,
        gender,
        products
    };
};


// ============== VERIFICAR STOCK POR TALLE/TALLE Y COLOR
