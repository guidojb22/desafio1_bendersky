import express from "express";
import {Server} from 'socket.io';
import {engine} from 'express-handlebars'

import productsRouter from "./routes/productsRouter.js"
import cartsRouter from "./routes/cartsRouter.js"
import views from './routes/views.js';
import __dirname from "./utils.js";
import ProductManager from "./dao/productManager.js";

const app = express();
const PORT = 8080;

const p = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({extended:true}));   
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use("/", views);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// app.get('/',(req,res)=>{
//     // res.setHeader('Content-Type', 'text/plain');
//     // res.status(200).render('home');
//     // return res.render('home');
// });

const expressServer = app.listen(PORT, ()=>{
    console.log(`Corriendo aplicación en el puerto ${PORT}`);
});
const socketServer = new Server(expressServer);

socketServer.on('connection', socket => {
    // console.log('cliente conectado desde el front')
    const productos = p.getProducts();
    socket.emit('productos', productos);

    socket.on('agregarProducto',producto => {
        const result = p.addProduct(producto);
        if(result.producto)
        socket.emit('productos', productos);
    });
});