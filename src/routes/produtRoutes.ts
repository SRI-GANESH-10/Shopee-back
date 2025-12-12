import Router from 'express';

import { addProducts, addReview, deleteProduct, getProducts } from '../controllers/prouctController';

const router = Router();

router.get('/getAll' , getProducts);
router.post('/addproduct' , addProducts );
router.delete('/delete/:id' , deleteProduct);
router.post('/:productId/reviews' , addReview);

export default router;