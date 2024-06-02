import mongoose from 'mongoose'

export const usuariosModelo=mongoose.model('usuarios',new mongoose.Schema({
    nombre: String,
    apellido: String,
    email:{
        type: String, unique:true
    }, 
    edad: Number,
    password: String,
    carrito: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
    rol:{
        type: String, default:"user"
    }
},
{
    timestamps:true, strict:false
}
))