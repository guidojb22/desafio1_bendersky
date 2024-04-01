import { Router } from 'express';
import CartsManager from '../dao/cartsManager.js';
const router=Router();

const c = new CartsManager();

router.get('/:cid',(req,res)=>{
    const {cid} = req.params;
    const result = c.getCartById(Number(cid));
    return res.json({result});
})

router.post('/',(req,res)=>{
    const result = c.createCart();
    return res.json({result});
})

router.post('/:cid/product/:pid',(req,res)=>{
    const {cid, pid} = req.params;
    const result = c.addProductInCart(Number(cid), Number(pid));
    return res.json({result});
})

export default router;