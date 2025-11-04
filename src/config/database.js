import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        console.log('🔍 MONGODB_URI:', process.env.MONGODB_URI);  // ⬅️ DEBUG
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no está definida en las variables de entorno');
    }

        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB conectado: ${conn.connection.host}`);
        console.log(`Base de datos : ${conn.connection.name}`);
    } catch (error) {
        console.log('Error al conectar a la base', error.mensage);
        process.exit(1); //Sale si no hay conexion
    }
}


//MANEJO DE CONEXION

mongoose.connection.on('disconnected', () =>{
    console.log('MongoDB desconectado');
});

mongoose.connection.on('error', (error) => {
    console.error('Error de MONGODB', error);
});