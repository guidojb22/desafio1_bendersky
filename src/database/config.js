import mongoose from 'mongoose';
import { config } from '../config/config.js';
import { loggerDesarrollo } from '../utils.js';

export const dbConnection = async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        loggerDesarrollo.info('Base de datos online')
    } catch (error) {
        loggerDesarrollo.error(`Error al levantar la base de datos ${error}`);
        process.exit(1);
    }
}