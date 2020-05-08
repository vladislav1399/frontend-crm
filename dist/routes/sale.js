"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default();
const sale_1 = __importDefault(require("../controllers/sale"));
router.post('/', sale_1.default.createNewSale);
router.get('/warehouse/:id', sale_1.default.getSaleByWarehouse);
router.get('/list/:id', sale_1.default.getSaleById);
router.get('/count', sale_1.default.getSaleCount);
router.patch('/:id', sale_1.default.updateSale);
router.delete('/:id', sale_1.default.deleteSale);
exports.default = router;
