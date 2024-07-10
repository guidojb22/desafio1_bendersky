import express from "express";
import {Server} from 'socket.io';
import {engine} from 'express-handlebars'
import sessions from "express-session";
import passport from "passport";
import { initPassport } from "./config/passport.config.js";

import productsRouter from "./routes/productsRouter.js"
import cartsRouter from "./routes/cartsRouter.js"
import {router as sessionsRouter} from "./routes/sessionsRouter.js";
import views from './routes/views.js';
import __dirname, { loggerDesarrollo } from "./utils.js";
import { middLogger } from "./utils.js";
import { dbConnection } from './database/config.js';
import { messageModel } from "./dao/models/messages.js";
import { addProductService, getProductsService } from "./services/products.js";
import { config } from "./config/config.js";
import { fakerES_MX as faker } from "@faker-js/faker"

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));   
app.use(express.static(__dirname + '/public'));
app.use(sessions({
    secret: config.SECRET,
    resave: true, saveUninitialized: true
}));

//paso 2
initPassport()
app.use(passport.initialize());
app.use(passport.session()); //solo si uso sessions

app.use("/api/session", sessionsRouter)

app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use("/", views);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter)
app.use(middLogger)


await dbConnection();

const expressServer = app.listen(PORT, ()=>{
    // console.log(`Corriendo aplicación en el puerto ${PORT}`);
    loggerDesarrollo.info(`Corriendo aplicación en el puerto ${PORT}`)
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


const generarCliente=()=>{
    let title = faker.commerce.productName();
    let description = faker.commerce.productDescription();
    let code = faker.number.octal({ min: 1000000, max: 10000000});
    let price = faker.commerce.price();
    let status = "true";
    let stock = faker.number.octal({ min: 100000, max:9000000});
    let category = faker.commerce.department();
    return {
        title,
        description,
        code,
        price,
        status,
        stock,
        category
    }
}

const generarProductos = (cantidad) => {
    const productos = [];
    for (let i = 0; i < cantidad; i++) {
        productos.push(generarCliente());
    }
    return productos;
};

app.get('/mockingproducts', (req, res) => {
    const productos = generarProductos(100);
    res.json(productos);
});

app.use((err, req, res, next) => {

    console.error('Error:', {
        name: err.name,
        message: err.message,
        cause: err.cause,
        code: err.code
    });

    if (err.code && err.cause) {
        return res.status(err.code).json({
            name: err.name,
            error: err.message,
            cause: err.cause,
            code: err.code
        });
    }

    return res.status(500).json({
        error: 'Ocurrió un error inesperado'
    });
});