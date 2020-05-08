import express, {Router} from "express";
const router: Router = express();
import brandController from '../controllers/brand'

router.get('/', brandController.getAllBrand);
router.post('/', brandController.createBrand);
router.delete('/:id', brandController.removeBrand)


export default router
