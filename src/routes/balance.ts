import express, {Router} from "express";
import balancesController from '../controllers/balance'
const router: Router = express();


router.get('/', balancesController.getBalanceProduct);
router.get('/warehouse/:id', balancesController.getBalanceProductForWarehouse);
router.get('/full', balancesController.getFullBalanceAllProducts);

export default router
