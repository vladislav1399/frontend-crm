"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expense_1 = __importDefault(require("../controllers/expense"));
const express_1 = __importDefault(require("express"));
const router = express_1.default();
router.post('/', expense_1.default.createExpense);
router.get('/:id', expense_1.default.getExpensesByWarehouse);
router.post('/date/stat', expense_1.default.getExpensesByDateForWarehouse);
router.delete('/:id', expense_1.default.removeExpense);
exports.default = router;
