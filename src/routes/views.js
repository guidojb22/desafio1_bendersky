import { Router } from 'express';
import { auth, isAdmin, isUser } from '../middleware/auth.js';
import { getProductsService } from '../services/products.js';
import { getCartByIdService } from '../services/carts.js';

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

router.get('/chat', auth, isUser,(req,res)=>{
    return res.render('chat')
});

router.get('/products', auth, isUser, async(req,res)=>{
    const result = await getProductsService(req.query);
    const isAdmin = req.session.usuario && req.session.usuario.rol === 'admin';
    return res.render('products', { title: 'productos', result, usuario: req.session.usuario, isAdmin });
});


router.get('/cart/:cid', auth, async(req,res)=>{
    const {cid} = req.params;
    const carrito = await getCartByIdService(cid);
    return res.render('cart',{title:'carrito', carrito});
});

router.get('/registro',(req,res)=>{
    res.status(200).render('registro')
});

router.get('/login',(req,res)=>{
    res.status(200).render('login')
});

router.get('/logout',(req,res)=>{
    res.status(200).render('logout')
});

export default router;