import express, {Router} from 'express'
import userController from '../controllers/user'
import warehouseController from '../controllers/warehouse';
import barCodeController from '../controllers/bar-code'
import professionController from '../controllers/profession'
import upload from "../middleware/upload"
const router: Router = express.Router();

router.get('/users', userController.getUser);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUser );
router.post('/users', upload.single('image'), userController.createUser);
router.patch('/users/:id', userController.updateUser);

router.get('/warehouse', warehouseController.getWarehouse);
router.get('/warehouse/:id', warehouseController.getWarehouseById);
// router.delete('/warehouse/:id', warehouseController.deleteWarehouse);
router.post('/warehouse', warehouseController.createWarehouse);
// router.patch('/warehouse/:id', warehouseController.updateWarehouse);

router.get('/bar-code', barCodeController.getLastBarCode );
router.get('/professions', professionController.getAllProfessions);
router.post('/professions', professionController.createProfessions);
router.delete('/professions/:id', professionController.removeProfession);


export default router;
