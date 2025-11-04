import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [100, 'El nombre no debe pasar los 100 caracteres'],
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'el email no es valido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minLength: [6, 'La contraseña tiene que tener al menos 6 caracteres'],
        select: false //No incluye las contraseñas en las consultas por defecto
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export default mongoose.model('User', userSchema);