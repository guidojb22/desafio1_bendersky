import { Router } from 'express';
import { isAdmin } from '../middleware/auth.js';
import { getProducts, getProductsById, addProduct, deleteProduct, updateProduct } from '../controllers/products.js';

const router=Router();

router.get('/', getProducts);
router.get('/:pid', getProductsById);
router.post('/', addProduct);
router.put('/:pid', isAdmin, updateProduct);
router.delete('/:pid', isAdmin, deleteProduct);

export default router;

// No olvidar volver a poner isAdmin para el post para la entrega final