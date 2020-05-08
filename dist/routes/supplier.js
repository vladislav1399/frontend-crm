"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supplier_1 = __importDefault(require("../controllers/supplier"));
const express_1 = __importDefault(require("express"));
const router = express_1.default();
router.post('/', supplier_1.default.createSupplier);
router.get('/', supplier_1.default.getSuppliers);
router.get('/:id', supplier_1.default.getSupplierById);
router.delete('/:id', supplier_1.default.removeSupplier);
router.patch('/:id', supplier_1.default.updateSupplier);
router.patch('/brands/:id', supplier_1.default.patchToBrandSupplier);
router.patch('/commit/:id', supplier_1.default.addCommit);
exports.default = router;
