import Product from '../models/Product.js';
import { NotFoundError, BusinessError } from '../middlewares/errorHandler.js';

//===== OBTENGO TODOS LOS PRODUCTOS

export const getAllProductsService = async () => {
    const products = await Product.find({ isActive: true });
    return{
        count: products.length,
        products: products,
    };
};


// ========== OBTENER PRODUCTOS POR ID

export const getProductByIdService = async (id) =>{
    const product = await Product.findById(id);

    if(!product || !product.isActive){
        throw new NotFoundError ('Producto', id);
    }
    return product;
};

//======================== OBTENER PRODUCTOS POR CATEGORIA

export const getProductsByCategoryService = async (category) => {
    const validCategories = ['zapatillas', 'ropa', 'perfumes'];
    if(!validCategories.includes(category.toLowerCase())){
        throw new BusinessError('Categoria invalida. Debe ser zapatilla, perfume o ropa', 400);
    }
    const products = await Product.find({
        category: category.toLowerCase(),
        isActive: true
    });
    return {
        count: products.length,
        category,
        products
    };
};


//==================== OBTENER PRODUCTOS POR MARCA

export const getProductsByBrandService = async (brand) => {
    const products = await Product.find({
        brand: new RegExp(`^${brand}$`, 'i'),
        isActive: true
    });
    return{
        count: products.length,
        brand,
        products
    };
};

//==================== OBTENER PRODUCTOS POR GENERO

export const getProductsByGenderService = async (gender) => {
    const validGenders = ['hombre', 'mujer', 'unisex'];
    if(!validGenders.includes(gender.toLowerCase())){
        throw new BusinessError ('Genero invalido. Debe ser: hombre, mujer o unisex', 400)
    }
    const products = await Product.find({
        gender: gender.toLowerCase(),
        isActive: true
    });
    return {
        count: products.length,
        gender,
        products
    };
};


// ========== CREAR UN NUEVO PRODUCTO ==========
export const createProductService = async (productData) => {
  const { name, category, price, stock, brand, description, image } = productData;

  // Verificar si ya existe un producto con el mismo nombre
  const existingProduct = await Product.findOne({
    name: new RegExp(`^${name}$`, 'i')
  });

  if (existingProduct) {
    throw new BusinessError('Ya existe un producto con ese nombre', 409);
  }

  const newProduct = new Product({
    name,
    category,
    price,
    stock,
    brand: brand || '',
    description: description || '',
    image: image || '',
    isActive: true
  });

  await newProduct.save();
  return newProduct;
};

// ========== ACTUALIZAR UN PRODUCTO ==========
export const updateProductService = async (id, updateData) => {
  const product = await Product.findById(id);

  if (!product || !product.isActive) {
    throw new NotFoundError('Producto', id);
  }

  // Si se actualiza el nombre, verificar que no exista
  if (updateData.name) {
    const existingProduct = await Product.findOne({
      name: new RegExp(`^${updateData.name}$`, 'i'),
      _id: { $ne: id }
    });

    if (existingProduct) {
      throw new BusinessError('Ya existe otro producto con ese nombre', 409);
    }
  }

  Object.assign(product, updateData);
  await product.save();

  return product;
};

// ========== ELIMINAR UN PRODUCTO (Soft Delete) ==========
export const deleteProductService = async (id) => {
  const product = await Product.findById(id);

  if (!product || !product.isActive) {
    throw new NotFoundError('Producto', id);
  }

  // Soft delete: marcamos como inactivo en lugar de eliminar
  product.isActive = false;
  await product.save();

  return product;
};

