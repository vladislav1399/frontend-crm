"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const state_1 = __importDefault(require("../controllers/state"));
const router = express_1.default();
router.get('/state-income', state_1.default.getAllStateIncome);
router.post('/state-income', state_1.default.createStateIncome);
router.get('/state-expenses', state_1.default.getAllStateExpenses);
router.post('/state-expenses', state_1.default.createStateExpenses);
router.delete('/expenses/:id', state_1.default.removeStateExpense);
router.post('/income/:id', state_1.default.removeStateIncome);
exports.default = router;
