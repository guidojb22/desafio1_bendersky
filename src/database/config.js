import mongoose from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://guidobendersky2292:Guidon42@guidobcluster.6nngbkh.mongodb.net/ecommerce');
        console.log('Base de datos online')
    } catch (error) {
        console.log(`Error al levantar la base de datos ${error}`);
        process.exit(1);
    }
}