import { database, getNextId } from '../database/db.js';
import { NotFoundError, BusinessError } from '../middlewares/errorHandler.js';

//===== OBTENGO TODOS LOS PRODUCTOS

export const getAllProductsService = () => {
    return{
        count: database.products.length,
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
        count: products.length,
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
        count: products.length,
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
        count: products.length,
        gender,
        products
    };
};


// ========== CREAR UN NUEVO PRODUCTO ==========
export const createProductService = (productData) => {
  const { name, category, price, stock, brand } = productData;
  
  // Verificar si ya existe un producto con el mismo nombre
  const existingProduct = database.products.find(
    p => p.name.toLowerCase() === name.toLowerCase()
  );
  
  if (existingProduct) {
    throw new BusinessError('Ya existe un producto con ese nombre', 409);
  }
  
  const newProduct = {
    id: getNextId('products'),
    name,
    category,
    price,
    stock,
    brand: brand || '',
    createdAt: new Date()
  };
  
  database.products.push(newProduct);
  return newProduct;
};

// ========== ACTUALIZAR UN PRODUCTO ==========
export const updateProductService = (id, updateData) => {
  const productIndex = database.products.findIndex(p => p.id === parseInt(id));
  
  if (productIndex === -1) {
    throw new NotFoundError('Producto', id);
  }
  
  // Si se actualiza el nombre, verificar que no exista
  if (updateData.name) {
    const existingProduct = database.products.find(
      p => p.name.toLowerCase() === updateData.name.toLowerCase() && 
           p.id !== parseInt(id)
    );
    
    if (existingProduct) {
      throw new BusinessError('Ya existe otro producto con ese nombre', 409);
    }
  }
  
  database.products[productIndex] = {
    ...database.products[productIndex],
    ...updateData,
    updatedAt: new Date()
  };
  
  return database.products[productIndex];
};

// ========== ELIMINAR UN PRODUCTO ==========
export const deleteProductService = (id) => {
  const productIndex = database.products.findIndex(p => p.id === parseInt(id));
  
  if (productIndex === -1) {
    throw new NotFoundError('Producto', id);
  }
  
  const deletedProduct = database.products[productIndex];
  database.products.splice(productIndex, 1);
  
  return deletedProduct;
};

