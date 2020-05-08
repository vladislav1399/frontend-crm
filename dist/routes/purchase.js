"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default();
const purchase_1 = __importDefault(require("../controllers/purchase"));
router.get('/warehouse/:id', purchase_1.default.getPurchasesByWarehouse);
router.get('/:id', purchase_1.default.getPurchaseById);
router.post('/', purchase_1.default.createPurchase);
router.patch('/:id', purchase_1.default.updatePurchase);
router.delete('/:id', purchase_1.default.removePurchase);
router.post('/date', purchase_1.default.getPurchaseForDate);
exports.default = router;
