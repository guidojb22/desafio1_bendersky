import express from "express";
import {Server} from 'socket.io';
import {engine} from 'express-handlebars'

import productsRouter from "./routes/productsRouter.js"
import cartsRouter from "./routes/cartsRouter.js"
import views from './routes/views.js';
import __dirname from "./utils.js";
import { dbConnection } from './database/config.js';
import { messageModel } from "./dao/models/messages.js";
import { addProductService, getProductsService } from "./services/products.js";

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({extended:true}));   
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use("/", views);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

await dbConnection();

const expressServer = app.listen(PORT, ()=>{
    console.log(`Corriendo aplicación en el puerto ${PORT}`);
});
const io = new Server(expressServer);

io.on('connection', async (socket) => {
    //Products
    const {payload} = await getProductsService({});
    const productos = payload;
    socket.emit('productos', payload);
    socket.on('agregarProducto', async producto => {
        const newProduct = await addProductService({...producto});
        if(newProduct){
            productos.push(newProduct);       
            socket.emit('productos', productos);
        }
    });

    //Chat
    const messages = await messageModel.find();
    socket.emit('message', messages);
    socket.on('message', async (data) => {
        const newMessage = await messageModel.create({...data});
        if(newMessage){
            const messages = await messageModel.find();
            io.emit('messageLogs', messages)
        }
    });

    socket.broadcast.emit('nuevo_user');
});