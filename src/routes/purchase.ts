import express, {Router} from "express";
const router: Router = express();
import purchaseController from '../controllers/purchase'

router.get('/warehouse/:id', purchaseController.getPurchasesByWarehouse);
router.get('/:id', purchaseController.getPurchaseById);
router.post('/', purchaseController.createPurchase);
router.patch('/:id', purchaseController.updatePurchase);
router.delete('/:id', purchaseController.removePurchase);
router.post('/date', purchaseController.getPurchaseForDate);

export default router
