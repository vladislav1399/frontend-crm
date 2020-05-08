"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cash_1 = __importDefault(require("../controllers/cash"));
const router = express_1.default();
router.get('/:id', cash_1.default.getCashByWarehouse);
router.post('/date/stat', cash_1.default.getCashByDateForWarehouse);
exports.default = router;
