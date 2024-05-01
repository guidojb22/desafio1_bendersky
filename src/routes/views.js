import { Router } from 'express';
import { productModel } from '../dao/models/products.js';

const router=Router();

router.get('/', async (req,res)=>{
    const productos = await productModel.find().lean();
    return res.render('home', {productos, styles: 'styles.css'})
})

router.get('/realtimeproducts', (req,res)=>{
    return res.render('realTimeProducts')
})

router.get('/chat', (req,res)=>{
    return res.render('chat')
})


export default router;