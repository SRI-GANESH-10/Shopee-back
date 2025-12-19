import Router from 'express';

import { addProducts, addReview, deleteProduct, getProducts } from '../controllers/prouctController';
import { upload } from '../middleware/multer';

const router = Router();

router.get('/getAll' , getProducts);
router.post('/addproduct' , upload.array('images') , addProducts );
router.delete('/delete/:id' , deleteProduct);
router.post('/:productId/reviews' , addReview);

export default router;