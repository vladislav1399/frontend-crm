"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const balance_1 = __importDefault(require("../controllers/balance"));
const router = express_1.default();
router.get('/', balance_1.default.getBalanceProduct);
router.get('/warehouse/:id', balance_1.default.getBalanceProductForWarehouse);
router.get('/full', balance_1.default.getFullBalanceAllProducts);
exports.default = router;
