"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default();
const brand_1 = __importDefault(require("../controllers/brand"));
router.get('/', brand_1.default.getAllBrand);
router.post('/', brand_1.default.createBrand);
router.delete('/:id', brand_1.default.removeBrand);
exports.default = router;
