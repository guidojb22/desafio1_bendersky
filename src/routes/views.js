import { Router } from 'express';
import { getProductsService } from '../services/products.js';
import { getCartByIdService } from '../services/carts.js'

const router=Router();

router.get('/', async (req, res) => {
    try {
        const { payload } = await getProductsService({ limit: 10, page: 1, sort: 'asc' });

        return res.render('home', { productos: payload, styles: 'styles.css' });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).send('Error interno del servidor');
    }
});


router.get('/realtimeproducts', (req,res)=>{
    return res.render('realTimeProducts')
});

router.get('/chat', (req,res)=>{
    return res.render('chat')
});

router.get('/products', async(req,res)=>{
    const result = await getProductsService(req.query);
    return res.render('products',{title:'productos', result});
});

router.get('/cart/:cid', async(req,res)=>{
    const {cid} = req.params;
    const carrito = await getCartByIdService(cid);
    return res.render('cart',{title:'carrito', carrito});
});

export default router;