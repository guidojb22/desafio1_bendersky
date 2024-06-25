import { Router } from 'express';
import { isUser } from '../middleware/auth.js';
import { getCartById, createCart, addProductInCart, deleteProductsInCart, updateProductsInCart, deleteCart } from '../controllers/carts.js' 

const router=Router();

router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/products/:pid', isUser, addProductInCart);
router.delete('/:cid/products/:pid', deleteProductsInCart);
router.put('/:cid/products/:pid', updateProductsInCart);
router.delete('/:cid', deleteCart)

export default router;