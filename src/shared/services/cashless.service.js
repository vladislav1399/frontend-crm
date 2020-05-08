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
const Cashless_1 = __importDefault(require("../../models/Cashless"));
const date_service_1 = __importDefault(require("./date.service"));
const createCashless = (cashless) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Cashless_1.default.create(cashless);
});
const cashlessByWarehouse = (idWarehouse) => __awaiter(void 0, void 0, void 0, function* () {
    return Cashless_1.default.find({ idWarehouse: idWarehouse }).sort({ $natural: -1 });
});
const lashCashlessByWarehouse = (idWarehouse) => __awaiter(void 0, void 0, void 0, function* () {
    return Cashless_1.default.findOne({ idWarehouse: idWarehouse }).sort({ $natural: -1 }).limit(1);
});
const updateCashless = (cashless, amountChance) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('amountChance', amountChance);
    return Cashless_1.default.updateOne({ _id: cashless._id }, { $inc: {
            balanceCashless: amountChance,
            balanceEnding: amountChance,
            changesDay: amountChance
        } });
});
const findCashlessForDate = (warehouseId, data) => __awaiter(void 0, void 0, void 0, function* () {
    let dataOt = new Date(data.dataOt).toISOString();
    let dataDo = data.dataDo;
    const dateFinish = date_service_1.default.dateForSearch(dataDo);
    return Cashless_1.default.find({ idWarehouse: warehouseId,
        dateCashless: {
            $gte: dataOt,
            $lt: dateFinish
        }
    });
});
module.exports = { createCashless, cashlessByWarehouse, lashCashlessByWarehouse, updateCashless, findCashlessForDate };
