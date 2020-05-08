import supplierController from '../controllers/supplier'
import express, {Router} from "express";
const router: Router = express();

router.post('/', supplierController.createSupplier);
router.get('/', supplierController.getSuppliers);
router.get('/:id', supplierController.getSupplierById);
router.delete('/:id', supplierController.removeSupplier);
router.patch('/:id', supplierController.updateSupplier);

router.patch('/brands/:id', supplierController.patchToBrandSupplier);
router.patch('/commit/:id', supplierController.addCommit);

export default router
