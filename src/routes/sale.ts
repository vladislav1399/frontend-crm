import express, {Router} from "express";
const router: Router = express();
import saleController from '../controllers/sale'


router.post('/', saleController.createNewSale);
router.get('/warehouse/:id', saleController.getSaleByWarehouse);
router.get('/list/:id', saleController.getSaleById);
router.get('/count', saleController.getSaleCount);
router.patch('/:id', saleController.updateSale);
router.delete('/:id', saleController.deleteSale);

export default router
