import { Router } from 'express';
import ProductManager from "../dao/productManager.js"

const router=Router();

const p = new ProductManager();

router.get('/',(req,res)=>{
    const {limit} = req.query;
    return res.json({ producto: p.getProducts(limit) })
});

router.get('/:pid',(req,res)=>{
    const {pid} = req.params;
    return res.json({producto: p.getProductById(Number(pid))});
})

router.post('/',(req, res)=>{
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;
    const result = p.addProduct({title, description, code, price, status, stock, category, thumbnails});
    return res.json({ result });
});

router.put('/:pid',(req, res)=>{
    const {pid} = req.params;
    const result = p.updateProduct(Number(pid), req.body);
    return res.json({ result });
});

router.delete('/:pid',(req, res)=>{
    const {pid} = req.params;
    const result = p.deleteProduct(Number(pid));
    return res.json({ result });
});


router.get('*',(req,res)=>{
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).json({
        message: "error 404 - Page not found"
    });
});


export default router;

// const productManager=new ProductManager("./src/data/productos.json")

// router.get("/", async(req, res)=>{

//     let {limit, skip, title}=req.query

//     console.log(skip, title)

//     let productos=await productManager.leerProductos()
//     if(limit){
//         productos=productos.slice(0, limit)
//     }

//     res.json(productos)

// })

// router.get("/:id", async(req, res)=>{

//     let id=req.params.id

//     id=Number(id)
//     if(isNaN(id)){
//         return res.json({error:`Ingrese un id numérico.`})
//     }

//     try {
//         let producto=await productManager.leerProductosById(id)
//         if(!producto){
//             return res.json({message:`No existen productos con id ${id}`})
//         }
    
//         return res.json(producto)
//     } catch (error) {
//         console.log(error)
//         return res.json({error:"Error desconocido."})
//     }
// })

// router.post('/api/products',(req,res)=>{
//     let {title, description, code, price, status, stock, category, thumbnails} = req.body;

//     if(!title || !description || !code || !price || !status || !stock || !category || !thumbnails){
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(400).json({error:'Complete todos los campos'});
//         }
//     //resto validaciones

//     try {
//         let nuevoProducto = productManager.addProduct({title, description, code, price, status, stock, category, thumbnails}) 

//         res.setHeader('Content-Type', 'application/json');
//         return res.status(200).json(nuevoProducto);

//     } catch (error) {
//         res.setHeader('Content-Type', 'application/json');
//         return res.status(500).json({
//             error:'Error inesperado en el servidor',
//             detalle:`${error.message}` });
//     }
// });

// router.put("/:id", async(req, res)=>{

//     let id=req.params.id
//     id=Number(id)
//     if(isNaN(id)){
//         return res.json({error:`Ingrese un id numérico.`})
//     }

//     // recuperar info desde body
//     // validar 

//     try {
//         let productoModificado=await productManager.update(id, {})
//         res.setHeader('Content-Type','application/json');
//         return res.status(200).json(productoModificado);
    
//     } catch (error) {
//         console.log(error)
//         return res.json({error:"Error desconocido."})
//     }

// })

// router.delete("/:id", async(req, res)=>{

//     let id=req.params.id
//     id=Number(id)
//     if(isNaN(id)){
//         return res.json({error:`Ingrese un id numérico.`})
//     }

//     try {
//         let productoEliminado=await productManager.delete(id)
//         res.setHeader('Content-Type','application/json');
//         return res.status(200).json(productoEliminado);
    
//         return res.json(producto)
//     } catch (error) {
//         console.log(error)
//         return res.json({error:"Error desconocido."})
//     }
// })