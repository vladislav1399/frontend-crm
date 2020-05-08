import express, {Router} from 'express'
import clientController from "../controllers/client"
const router: Router = express();

router.post('/', clientController.createNewClient);
router.get('/', clientController.getClient);
router.get('/:id', clientController.getClientById);
router.patch('/:id', clientController.updateClient);

export default router;
