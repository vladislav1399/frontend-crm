"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = __importDefault(require("../controllers/category"));
const router = express_1.default();
router.get('/', category_1.default.getCategories);
router.post('/', category_1.default.createCategory);
router.get('/:id', category_1.default.getCategoryById);
router.patch('/:id', category_1.default.updateCategory);
router.delete('/:id', category_1.default.removeCategory);
exports.default = router;
