import express, {Router} from 'express'
import stateController from "../controllers/state"
const router: Router = express();

router.get('/state-income', stateController.getAllStateIncome);
router.post('/state-income', stateController.createStateIncome);
router.get('/state-expenses', stateController.getAllStateExpenses);
router.post('/state-expenses', stateController.createStateExpenses);
router.delete('/expenses/:id', stateController.removeStateExpense);
router.post('/income/:id', stateController.removeStateIncome);

export default router;
