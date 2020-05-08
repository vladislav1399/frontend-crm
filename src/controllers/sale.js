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
const sale_service_1 = __importDefault(require("../shared/services/sale.service"));
const balance_service_1 = __importDefault(require("../shared/services/balance.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const finance_service_1 = __importDefault(require("../shared/services/finance.service"));
const client_service_1 = __importDefault(require("../shared/services/client.service"));
const user_service_1 = __importDefault(require("../shared/services/user.service"));
const date_service_1 = __importDefault(require("../shared/services/date.service"));
const purchase_service_1 = __importDefault(require("../shared/services/purchase.service"));
const getSaleByWarehouse = (req, res) => {
    sale_service_1.default.fetchFromWarehouse(req.params.id).then((sales) => {
        res.status(200).json(sales);
    });
};
const getSaleById = (req, res) => {
    let saleId = req.params.id;
    sale_service_1.default.getById(saleId).then((sale) => {
        res.status(200).json(sale);
    });
};
const getSaleCount = (req, res) => {
    sale_service_1.default.saleCountStatistic().then((sales) => {
        res.status(200).json(sales);
    });
};
const createNewSale = (req, res) => {
    const newSale = req.body;
    client_service_1.default.plusSaleAmount(newSale).then(() => {
        user_service_1.default.plusUserSaleAmount(newSale).then(() => {
            sale_service_1.default.createSale(newSale).then((sale) => {
                balance_service_1.default.updateBalanceOfSell(newSale.productsSale, newSale.warehouse, true).then(() => {
                    finance_service_1.default.updateCashAndCashless(newSale.warehouse, newSale.allAmount, newSale.cancellation).then(result => {
                        res.status(200).json(message_service_1.default.sendMessage(true, 'Продажа успешно создана'));
                    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
                }).catch(e => console.log(e.message));
            }).catch((e) => console.log(e.message));
        });
    });
};
const updateSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const saleId = req.params.id;
    const newSale = req.body; // моя отредактированая продажа
    const CCL = newSale.cancellation; // форма оплаты
    const productsSaleUpdate = newSale.productsSale; // отредактированые актуальные товары
    const warehouseId = newSale.warehouse;
    newSale.updatedDate = date_service_1.default.getDateNow();
    sale_service_1.default.getById(saleId).then((sale) => {
        let oldProductSale = sale.productsSale; // получаю продажу для сравнения изменений
        let reBalanceProductsArray = purchase_service_1.default.reBalanceProducts(oldProductSale, productsSaleUpdate, false);
        let arrayToUpdateSale = purchase_service_1.default.newProductInArr(productsSaleUpdate, reBalanceProductsArray, false);
        let finishArrayProductsSale = purchase_service_1.default.removeProductsArr(oldProductSale, arrayToUpdateSale, false);
        let fn = sale_service_1.default.getAllAmountDifferenceSale(sale, newSale);
        balance_service_1.default.updateBalanceOfSell(finishArrayProductsSale, warehouseId).then(() => {
            if (newSale.cancellation !== sale.cancellation) {
                finance_service_1.default.updateCashAndCashless(newSale.warehouse, 0 - sale.allAmount, sale.cancellation).then(() => {
                    finance_service_1.default.updateCashAndCashless(newSale.warehouse, newSale.allAmount, newSale.cancellation).then(() => {
                    }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
                }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
            }
            finance_service_1.default.updateCashAndCashless(newSale.warehouse, fn.allA, CCL).then(() => {
                sale_service_1.default.update(newSale, String(sale._id)).then(() => {
                    res.status(200).json(message_service_1.default.sendMessage(true, 'Продажа успешно обновлена!'));
                }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
            }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
        });
    }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const deleteSale = (req, res) => {
    const saleId = req.params.id;
    sale_service_1.default.getById(saleId).then((sale) => {
        const saleProducts = sale.productsSale;
        const warehouseId = sale.warehouse;
        finance_service_1.default.updateCashAndCashless(warehouseId, 0 - sale.allAmount, sale.cancellation).then(() => {
            sale_service_1.default.remove(saleId).then(() => {
                balance_service_1.default.updateBalanceOfSell(saleProducts, warehouseId).then(() => {
                    res.status(200).json(message_service_1.default.sendMessage(true, 'Продажа успешно удалена'));
                }).catch((e) => res.status(200).json(message_service_1.default.sendMessage(true, 'Продажа была успешно удалена')));
            }).catch((err) => res.status(200).json(message_service_1.default.sendMessage(false, err.message)));
        }).catch((err) => res.status(200).json(message_service_1.default.sendMessage(false, err.message)));
    });
};
module.exports = {
    createNewSale,
    getSaleByWarehouse,
    getSaleById,
    getSaleCount,
    updateSale,
    deleteSale,
};
