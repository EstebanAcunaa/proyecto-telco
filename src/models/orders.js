import { required } from "joi";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'La cantidad debe ser al menos 1']
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'El precio no puede ser negativo']
        }
    }],
    totalAmount: {
        type: Number, 
        required: true,
        min: [0, 'El monto total no puede ser negativo']
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'cash'],
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('Order', orderSchema);