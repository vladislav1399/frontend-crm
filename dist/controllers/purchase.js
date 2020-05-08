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
const purchase_service_1 = __importDefault(require("../shared/services/purchase.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const balance_service_1 = __importDefault(require("../shared/services/balance.service"));
const profession_service_1 = __importDefault(require("../shared/services/profession.service"));
const finance_service_1 = __importDefault(require("../shared/services/finance.service"));
const product_service_1 = __importDefault(require("../shared/services/product.service"));
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const getPurchasesByWarehouse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const warehouseId = String(req.params.id);
    yield purchase_service_1.default.getPurchase(warehouseId).then(purchases => {
        res.status(200).json(purchases);
    }).catch(e => res.status(200).json(e.message));
});
const getPurchaseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    purchase_service_1.default.purchaseById(String(req.params.id)).then(purchase => {
        res.status(200).json(purchase);
    }).catch(e => res.status(200).json(e.message));
});
const createPurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newPurchase = req.body;
    yield purchase_service_1.default.create(newPurchase).then(result => {
        balance_service_1.default.updateBalanceOfPurchase((newPurchase), '+').then((result) => {
            profession_service_1.default.updateSupplier(newPurchase.supplier, newPurchase.allAmount).then(result => {
                finance_service_1.default.updateCashAndCashless(newPurchase.warehouseId, newPurchase.allAmount, '-', newPurchase.cancellation).then(result => {
                    product_service_1.default.updateProductsPurchasePrice(newPurchase.productPurchase);
                    res.status(200).json(message_service_1.default.sendMessage(true, `Закупка успешно добалена`));
                }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
            }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
        }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const removePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const purchaseId = ObjectId(req.params.id);
    purchase_service_1.default.purchaseById(purchaseId).then(purchase => {
        const removerPurchase = purchase;
        finance_service_1.default.updateCashAndCashless(removerPurchase.warehouseId, removerPurchase.allAmount, '+', removerPurchase.cancellation).then(result => {
            purchase_service_1.default.removePurchase(purchaseId).then(result => {
                balance_service_1.default.updateBalanceOfPurchase(removerPurchase, '-').then(result => {
                    res.status(200).json(message_service_1.default.sendMessage(true, 'Закупка была успешно удалена'));
                }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(true, 'Закупка была успешно удалена')));
            });
        }).catch((err) => res.status(200).json(message_service_1.default.sendMessage(false, err.message)));
    });
});
const getPurchaseForDate = (req, res) => {
    const data = { dateOt: req.body.dateOt, dateDo: req.body.dateDo };
    let warehouseId = req.body.warehouseId;
    purchase_service_1.default.getPurchaseByDate(warehouseId, data).then((purchases) => {
        res.status(200).json(purchases);
    }).catch((e) => res.status(200).json(e.message));
};
const updatePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const purchaseId = req.params.id;
    const updatedPurchase = req.body;
    const CCL = updatedPurchase.cancellation;
    const removeProductArr = updatedPurchase.productDelete;
    const addProductArr = updatedPurchase.addProduct;
    purchase_service_1.default.purchaseById(String(purchaseId)).then((purchase) => {
        let reBalanceProduct = purchase_service_1.default.reBalancePurchase(purchase.productPurchase, updatedPurchase.productPurchase);
        let addNewProduct = purchase_service_1.default.reBalanceUpdateForAddNewProduct(purchase.productPurchase, addProductArr);
        balance_service_1.default.updateBalanceAfterUpdatePurchase(updatedPurchase.warehouseId, reBalanceProduct).then(result => {
            if (result) {
                balance_service_1.default.removeBalanceAfterUpdatePurchase(updatedPurchase.warehouseId, removeProductArr).then(result => {
                    if (result) {
                        balance_service_1.default.addProductsBalanceAfterUpdatePurchase(updatedPurchase.warehouseId, addNewProduct).then(result => {
                            if (result) {
                                let fn = purchase_service_1.default.getAllAmountDifference(purchase, updatedPurchase);
                                if (updatedPurchase.cancellation !== purchase.cancellation) {
                                    finance_service_1.default.updateCashAndCashless(updatedPurchase.warehouseId, purchase.allAmount, '+', purchase.cancellation).then(result => {
                                        finance_service_1.default.updateCashAndCashless(updatedPurchase.warehouseId, purchase.allAmount, '-', updatedPurchase.cancellation).then(result => {
                                        });
                                    });
                                }
                                finance_service_1.default.updateCashAndCashless(updatedPurchase.warehouseId, fn.allA, fn.op, CCL).then(result => {
                                    purchase_service_1.default.updatePurchase(String(purchaseId), updatedPurchase).then(result => {
                                        res.status(200).json(message_service_1.default.sendMessage(true, 'Изменения в закупку успешно внесены'));
                                    }).catch((err) => res.status(200).json(message_service_1.default.sendMessage(false, err.message)));
                                }).catch((err) => res.status(200).json(message_service_1.default.sendMessage(false, err.message)));
                            }
                        }).catch((err) => res.status(200).json(message_service_1.default.sendMessage(false, err.message)));
                    }
                });
            }
        }).catch((err) => res.status(200).json(message_service_1.default.sendMessage(false, err.message)));
    }).catch((err) => res.status(200).json(message_service_1.default.sendMessage(false, err.message)));
});
module.exports = {
    getPurchasesByWarehouse,
    getPurchaseById,
    createPurchase,
    updatePurchase,
    removePurchase,
    getPurchaseForDate,
};
