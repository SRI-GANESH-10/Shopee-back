import Router from 'express';

import { addProducts, deleteProduct, getProducts } from '../controllers/prouctController';

const router = Router();

router.get('/getAll' , getProducts);
router.post('/addproduct' , addProducts );
router.delete('/delete/:id' , deleteProduct);

export default router;