"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const income_1 = __importDefault(require("../controllers/income"));
const express_1 = __importDefault(require("express"));
const router = express_1.default();
router.post('/', income_1.default.createIncome);
router.get('/:id', income_1.default.getIncomeByWarehouse);
router.post('/date/stat', income_1.default.getIncomeByDateForWarehouse);
router.delete('/:id', income_1.default.removeIncome);
exports.default = router;
