"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cashless_1 = __importDefault(require("../controllers/cashless"));
const router = express_1.default();
router.get('/:id', cashless_1.default.getCashlessByWarehouse);
router.post('/:id', cashless_1.default.getCashlessByDate);
exports.default = router;
