import { Router } from 'express';
import { createTicket } from '../controllers/carts.js'

const router=Router();

router.post('/', createTicket);

export default router;