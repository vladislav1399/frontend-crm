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
const supplier_service_1 = __importDefault(require("../shared/services/supplier.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const date_service_1 = __importDefault(require("../shared/services/date.service"));
//ПОСТАВЩИКИ
const createSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSupplier = req.body;
    yield supplier_service_1.default.createSupplier(newSupplier).then(result => {
        res.status(200).json(message_service_1.default.sendMessage(true, `Поставщик успешно добавлен`));
    }).catch((e) => message_service_1.default.sendMessage(false, e.message));
});
const getSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield supplier_service_1.default.getSupplier().then(supplier => {
        res.status(200).json(supplier);
    }).catch(e => res.status(200).json(e.message));
});
const getSupplierById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let supplierId = req.params.id;
    yield supplier_service_1.default.supplierById(supplierId).then(supplier => {
        res.status(200).json(supplier);
    }).catch(e => res.status(200).json(e.message));
});
const removeSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let supplierId = req.params.id;
    yield supplier_service_1.default.deleteSupplier(supplierId).then(result => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Поставщик успешно удален!'));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const updateSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let supplierId = req.params.id;
    let supplier = req.body;
    yield supplier_service_1.default.updateSupplierInfo(supplierId, supplier).then(result => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Поставщик успешно обновлен!'));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const addCommit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = date_service_1.default.getDateNow();
    let supplierId = req.params.id;
    let review = req.body;
    review.date = date;
    supplier_service_1.default.addReview(supplierId, review).then((result) => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Новая заметка успешно добавлена!'));
    }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const patchToBrandSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let supplierId = req.params.id;
    let brand = req.body;
    // @ts-ignore
    supplier_service_1.default.updateBrandsSupplier(supplierId, brand).then(result => {
        let message = '';
        if (brand.operator === '-') {
            message = `Бренд ${brand.brandName} успешно удален!`;
        }
        else if (brand.operator === '+') {
            message = `Бренд ${brand.name} успешно добавлен!`;
        }
        res.status(200).json(message_service_1.default.sendMessage(true, message));
    }).catch((e) => {
        console.log(e.message);
        res.status(200).json(message_service_1.default.sendMessage(false, e.message));
    });
});
module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    removeSupplier,
    updateSupplier,
    addCommit,
    patchToBrandSupplier
};
