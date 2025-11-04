import mongoose from "mongoose";
import dotenv from 'dotenv';
import Product from "../models/Product.js";
import User from "../models/User.js";
import { connectDB } from "../config/database.js";
import { database } from "../database/db.js";

dotenv.config();

//USAR DATOS YA EXISTENTES CREADOS EN DB.JS

const products = database.products.map(product =>{
    const {id, ...productWithoutId} = product;
    
    return{
    ...productWithoutId,
    description: '',
    image: `https://via.placeholder.com/300x300?text=${encodeURIComponent(product.name)}`,
    isActive: true
    };
});

const users = database.users.map(user =>{
    const {id, password, ...userWithoutIdAndPassword} = user;

    return{
        ...userWithoutIdAndPassword,
        password, 
        isActive: true
    };
});

const seedDatabase = async () => {
    try {
        console.log('Iniciando seed de base de datos');

        await connectDB();
        
        // ======== LIMPIAR BASE DE DATOS

        console.log('Limpiando base de datos');
        await User.deleteMany({});
        await Product.deleteMany({});
        console.log('Base de datos limpia');

        // ======= CREAR USUARIO 
        console.log('Creando usuarios');

        // Contraseñas hasheadas, agregarlas directamente

        const createdUsers = await User.insertMany(users);
        console.log(`${createdUsers.length} usuarios creados\n`);
        
        //  Mostrar usuarios creados 
        createdUsers.forEach(user => {
            console.log(`${user.email} - ${user.role}`);
        });

        //========= CREAR PRODUCTOS

        console.log(`\n Creando productos...`);
        const createdProducts = await Product.insertMany(products);
        console.log(`${createdProducts.length} productos creados \n `);

        // Mostrar productos creados

        createdProducts.forEach( product =>{
            console.log(`${product.name} - $${product.price}`);
        });

        console.log('\n ¡Seed completado exitosamente!');
        console.log('\n RESUMEN:');
        console.log(`   Usuarios: ${createdUsers.length}`);
        console.log(`   Productos: ${createdProducts.length}`);
        console.log('\n CREDENCIALES DE PRUEBA:');
        console.log('   Email: juan@example.com / Contraseña: (la que usaste originalmente)');
        console.log('   Email: maria@example.com / Contraseña: (la que usaste originalmente)');
        console.log('   Email: carlos@example.com / Contraseña: (la que usaste originalmente)');
    

        process.exit(0);
    }catch (error) {
        console.error(`Error en la seed`, error);
        process.exit(1);
    }
};

seedDatabase();