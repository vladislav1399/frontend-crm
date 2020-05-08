import express, {Router} from "express";
import cashController from '../controllers/cash'
const router: Router = express();

router.get('/:id', cashController.getCashByWarehouse);
router.post('/date/stat', cashController.getCashByDateForWarehouse);

export default router
