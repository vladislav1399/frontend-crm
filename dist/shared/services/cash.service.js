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
const Cash_1 = __importDefault(require("../../models/Cash"));
const date_service_1 = __importDefault(require("./date.service"));
const createCash = (cash) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cash_1.default.create(cash);
});
const cashByWarehouse = (idWarehouse) => __awaiter(void 0, void 0, void 0, function* () {
    return Cash_1.default.find({ idWarehouse: idWarehouse }).sort({ $natural: -1 });
});
const lastCashByWarehouse = (idWarehouse) => __awaiter(void 0, void 0, void 0, function* () {
    return Cash_1.default.findOne({ idWarehouse: idWarehouse }).sort({ $natural: -1 }).limit(1);
});
const updateCash = (cash, amountChance) => {
    return Cash_1.default.updateOne({ _id: cash._id }, { $inc: {
            balanceCash: amountChance,
            balanceEnding: amountChance,
            changesDay: amountChance
        } });
};
const findCashForDate = (warehouseId, data) => __awaiter(void 0, void 0, void 0, function* () {
    let dataOt = new Date(data.dataOt).toISOString();
    let dataDo = data.dataDo;
    const dateFinish = date_service_1.default.dateForSearch(dataDo);
    return Cash_1.default.find({ idWarehouse: warehouseId,
        dateCash: {
            $gte: dataOt,
            $lt: dateFinish
        }
    });
});
module.exports = { createCash, cashByWarehouse, lastCashByWarehouse, updateCash, findCashForDate };
