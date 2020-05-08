"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default();
const product_1 = __importDefault(require("../controllers/product"));
router.post('/', product_1.default.createProduct);
router.get('/', product_1.default.getAllProducts);
router.get('/:id', product_1.default.getProductsByCategory);
router.get('/product-one/:id', product_1.default.getProductById);
router.patch('/product-one/:id', product_1.default.updateProduct);
router.delete('/product-one/:id', product_1.default.removeProduct);
exports.default = router;
