import expenseController from '../controllers/expense'
import express, {Router} from "express";
const router: Router = express();

router.post('/', expenseController.createExpense);
router.get('/:id', expenseController.getExpensesByWarehouse);
router.post('/date/stat', expenseController.getExpensesByDateForWarehouse);
router.delete('/:id', expenseController.removeExpense);

export default router
