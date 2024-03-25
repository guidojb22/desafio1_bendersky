import express from "express";
import ProductManager from "./productManager.js";

const app = express();
const PORT = 8080;

app.get('/products',(req,res)=>{
    
    const p = new ProductManager();
    return res.json({ prod: p.getProducts() })
});

app.listen(PORT, ()=>{
    console.log("Corriendo aplicación en el puerto");
});