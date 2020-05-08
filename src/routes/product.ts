import express, {Router} from "express";
const router: Router = express();
import productController from '../controllers/product'


router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductsByCategory);
router.get('/product-one/:id', productController.getProductById);
router.patch('/product-one/:id', productController.updateProduct);
router.delete('/product-one/:id', productController.removeProduct);
export default router
