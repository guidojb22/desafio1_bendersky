import express from "express";
import productsRouter from "./routes/productsRouter.js"
import cartsRouter from "./routes/cartsRouter.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));   

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('Preentrega 1 - E-commerce Guido Bendersky');
});

app.listen(PORT, ()=>{
    console.log(`Corriendo aplicación en el puerto ${PORT}`);
});