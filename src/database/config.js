import mongoose from 'mongoose';
import { config } from '../config/config.js';

export const dbConnection = async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log('Base de datos online')
    } catch (error) {
        console.log(`Error al levantar la base de datos ${error}`);
        process.exit(1);
    }
}