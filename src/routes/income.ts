import incomeController from '../controllers/income'
import express, {Router} from "express";
const router: Router = express();

router.post('/', incomeController.createIncome);
router.get('/:id', incomeController.getIncomeByWarehouse);
router.post('/date/stat', incomeController.getIncomeByDateForWarehouse);
router.delete('/:id', incomeController.removeIncome);


export default router
