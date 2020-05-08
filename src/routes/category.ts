import express, {Router} from 'express'
import categoryController from "../controllers/category"
const router: Router = express();

router.get('/', categoryController.getCategories);
router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategoryById);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.removeCategory);
export default router;
