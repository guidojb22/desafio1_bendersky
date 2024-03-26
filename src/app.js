import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const PORT = 8080;

const p = new ProductManager();

app.get('/products',(req,res)=>{
    const {limit} = req.query;
    return res.json({ producto: p.getProducts(limit) })
});

app.get('/products/:pid',(req,res)=>{
    const {pid} = req.params;
    return res.json({producto: p.getProductById(Number(pid))});
})

app.listen(PORT, ()=>{
    console.log(`Corriendo aplicación en el puerto ${PORT}`);
});