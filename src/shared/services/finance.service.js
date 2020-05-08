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
const date_service_1 = __importDefault(require("./date.service"));
const cash_service_1 = __importDefault(require("./cash.service"));
const cashless_service_1 = __importDefault(require("./cashless.service"));
const warehouse_service_1 = __importDefault(require("./warehouse.service"));
const createCashAndCashless = (warehouseId) => __awaiter(void 0, void 0, void 0, function* () {
    const date = yield date_service_1.default.getDateNow();
    const newCash = {
        idWarehouse: warehouseId,
        dateCash: date,
        balanceBeginning: 0,
        balanceEnding: 0,
        changesDay: 0,
        balanceCash: 0,
    };
    const newCashless = {
        idWarehouse: warehouseId,
        dateCashless: date,
        balanceBeginning: 0,
        balanceEnding: 0,
        changesDay: 0,
        balanceCashless: 0,
    };
    return yield cash_service_1.default.createCash(newCash).then(cash => {
        return cashless_service_1.default.createCashless(newCashless);
    });
});
const updateCashAndCashless = (idWarehouse, changeValue, cashAndCashless) => __awaiter(void 0, void 0, void 0, function* () {
    if (cashAndCashless === 'Наличными') {
        yield cash_service_1.default.lastCashByWarehouse(idWarehouse).then(cash => {
            if (cash !== null) {
                return cash_service_1.default.updateCash(cash, changeValue);
            }
        });
    }
    else if (cashAndCashless === 'Безналично') {
        yield cashless_service_1.default.lashCashlessByWarehouse(idWarehouse).then(cashless => {
            if (cashless !== null) {
                return cashless_service_1.default.updateCashless(cashless, changeValue);
            }
        });
    }
});
const createNewDayCashing = () => __awaiter(void 0, void 0, void 0, function* () {
    const date = date_service_1.default.getDateNow();
    yield warehouse_service_1.default.getAllWarehouse().then(warehouses => {
        for (let i = 0; i < warehouses.length; i++) {
            cashless_service_1.default.lashCashlessByWarehouse(warehouses[i]._id).then(lastCashless => {
                if (lastCashless !== null) {
                    const newCashless = {
                        idWarehouse: lastCashless.idWarehouse,
                        dateCashless: date,
                        balanceBeginning: lastCashless.balanceCashless,
                        balanceEnding: lastCashless.balanceCashless,
                        changesDay: 0,
                        balanceCashless: lastCashless.balanceCashless,
                    };
                    cashless_service_1.default.createCashless(newCashless).then(result => {
                        return result;
                    });
                }
            });
            cash_service_1.default.lastCashByWarehouse(warehouses[i]._id).then(lastCash => {
                if (lastCash !== null) {
                    const newCash = {
                        idWarehouse: lastCash.idWarehouse,
                        dateCash: date,
                        balanceBeginning: lastCash.balanceCash,
                        balanceEnding: lastCash.balanceCash,
                        changesDay: 0,
                        balanceCash: lastCash.balanceCash,
                    };
                    cash_service_1.default.createCash(newCash).then(result => {
                        return result;
                    });
                }
            });
        }
    });
});
module.exports = { createCashAndCashless, updateCashAndCashless, createNewDayCashing };
