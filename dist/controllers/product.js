"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const product_service_1 = __importDefault(require("../shared/services/product.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const date_service_1 = __importDefault(require("../shared/services/date.service"));
const balance_service_1 = __importDefault(require("../shared/services/balance.service"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = date_service_1.default.getDateNow();
    const newProduct = req.body;
    newProduct.dateCreate = date;
    newProduct.dateLastUpdate = date;
    yield product_service_1.default.createProduct(newProduct).then((result) => {
        let productId = String(result._id);
        let barCode = Number(result.barCode);
        balance_service_1.default.createBalanceForProduct(productId, barCode).then(result => {
            res.status(200).json(message_service_1.default.sendMessage(true, 'Новый товар успешно создан'));
        }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
    }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_service_1.default.fetchProducts().then((products) => {
        res.status(200).json(products);
    }).catch((e) => console.log(e.message));
});
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_service_1.default.fetchByCategory(String(req.params.id)).then((products) => {
        res.status(200).json(products);
    }).catch((e) => console.log(e.message));
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    product_service_1.default.fetchById(String(req.params.id)).then((product) => {
        res.status(200).json(product);
    });
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = req.body;
    product_service_1.default.updateOneProduct(product).then((result) => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Товар успешно обновлен!'));
    }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let productId = String(req.params.id);
    product_service_1.default.deleteProduct(productId).then((result) => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Товар успешно удален!'));
    }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
module.exports = {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    getProductById,
    updateProduct,
    removeProduct
};
