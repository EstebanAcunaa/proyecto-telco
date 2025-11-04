import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'El nombre del producto es requerido'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder 100 caracteres'],
    },
    description: {
        type: String,
        maxlength: [500, 'La descripcion no puede superar los 500 caracteres'],
    },
    price: {
        type: Number,
        required: [true, 'El precio es requerido'],
        min: [0, 'El precio no puede ser negativo'],
    },
    category: {
        type: String,
        required: [true, 'La categoria del producto es requerida'],
        enum: ['zapatillas', 'ropa', 'perfumes'],
    },
    brand: {
        type: String,
        trim: true,
    },
    stock: {
        type: Number,
        required: [true, 'El stock es requerido'],
        min: [0, 'El stock no puede ser negativo'],
        default: 0
    },
    image:{
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {

    timestamps: true //Agrega createdAt y updateAT automaticamente
    
});

export default mongoose.model('Product', productSchema);