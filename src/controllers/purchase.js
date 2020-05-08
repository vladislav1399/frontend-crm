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
    const productsPurchase = newPurchase.productPurchase;
    const warehouseId = newPurchase.warehouseId;
    yield purchase_service_1.default.create(newPurchase).then(() => {
        balance_service_1.default.updateBalanceOfPurchase(productsPurchase, warehouseId).then(() => {
            profession_service_1.default.updateSupplier(newPurchase.supplier, newPurchase.allAmount).then(() => {
                finance_service_1.default.updateCashAndCashless(newPurchase.warehouseId, 0 - newPurchase.allAmount, newPurchase.cancellation).then(() => {
                    product_service_1.default.updateProductsPurchasePrice(newPurchase.productPurchase);
                    res.status(200).json(message_service_1.default.sendMessage(true, `Закупка успешно добалена`));
                }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
            }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
        }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const removePurchase = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const purchaseId = ObjectId(req.params.id);
    purchase_service_1.default.purchaseById(purchaseId).then((purchase) => {
        const productsPurchase = purchase.productPurchase;
        const warehouseId = purchase.warehouseId;
        finance_service_1.default.updateCashAndCashless(warehouseId, purchase.allAmount, purchase.cancellation).then(() => {
            purchase_service_1.default.removePurchase(purchaseId).then(result => {
                balance_service_1.default.updateBalanceOfPurchase(productsPurchase, warehouseId, false).then(result => {
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
    purchase_service_1.default.purchaseById(String(purchaseId)).then((purchase) => {
        let reBalanceProducts = purchase_service_1.default.reBalanceProducts(purchase.productPurchase, updatedPurchase.productPurchase, true);
        let arrayToUpdate = purchase_service_1.default.newProductInArr(updatedPurchase.productPurchase, reBalanceProducts, true);
        let finishArrayProducts = purchase_service_1.default.removeProductsArr(purchase.productPurchase, arrayToUpdate, true);
        balance_service_1.default.updateBalanceOfPurchase(finishArrayProducts, updatedPurchase.warehouseId).then(result => {
            if (result !== null) {
                let fn = purchase_service_1.default.getAllAmountDifference(purchase, updatedPurchase);
                if (updatedPurchase.cancellation !== purchase.cancellation) {
                    finance_service_1.default.updateCashAndCashless(updatedPurchase.warehouseId, purchase.allAmount, purchase.cancellation).then(() => {
                        finance_service_1.default.updateCashAndCashless(updatedPurchase.warehouseId, 0 - updatedPurchase.allAmount, updatedPurchase.cancellation).then(() => {
                        });
                    });
                }
                finance_service_1.default.updateCashAndCashless(updatedPurchase.warehouseId, fn.allA, CCL).then(result => {
                    purchase_service_1.default.updatePurchase(String(purchaseId), updatedPurchase).then(result => {
                        res.status(200).json(message_service_1.default.sendMessage(true, 'Изменения в закупку успешно внесены'));
                    }).catch((err) => res.status(200).json(message_service_1.default.sendMessage(false, err.message)));
                }).catch((err) => res.status(200).json(message_service_1.default.sendMessage(false, err.message)));
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
