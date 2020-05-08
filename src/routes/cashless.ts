import express, {Router} from "express";
import cashlessController from "../controllers/cashless";
const router: Router = express();

router.get('/:id', cashlessController.getCashlessByWarehouse);
router.post('/:id', cashlessController.getCashlessByDate);

export default router
