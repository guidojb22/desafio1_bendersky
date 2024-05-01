import {Schema, model} from 'mongoose';

const nameCollection = 'Producto';

const ProductosSchema = new Schema({
    title:{type:String, require:[true,'El title del producto es obligatorio']},
    description:{type:String, require:[true,'La description del producto es obligatorio']},
    code:{type:String, require:[true,'El code del producto es obligatorio'], unique: true},
    price:{type:Number, require:[true,'El price del producto es obligatorio']},
    status:{type:Boolean, default: true},
    stock:{type:Number, require:[true,'El stock del producto es obligatorio']},
    category:{type:String, require:[true,'El category del producto es obligatorio']},
    thumbnails:{type:String},
});

export const productModel = model(nameCollection, ProductosSchema);