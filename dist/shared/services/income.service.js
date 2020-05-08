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
const Income_1 = __importDefault(require("../../models/Income"));
const date_service_1 = __importDefault(require("./date.service"));
const createNewIncome = (income) => __awaiter(void 0, void 0, void 0, function* () {
    return Income_1.default.create(income);
});
const allIncomeByWarehouse = (warehouseId) => __awaiter(void 0, void 0, void 0, function* () {
    return Income_1.default.find({ warehouseId: warehouseId }).populate('author', 'surname name').populate('stateIncome', 'name').sort({ $natural: -1 });
});
const getIncomeByDate = (warehouseId, date) => __awaiter(void 0, void 0, void 0, function* () {
    let dateOt = new Date(date.dateOt).toISOString();
    let dateDo = date.dateDo;
    const dateFinish = date_service_1.default.dateForSearch(dateDo);
    return Income_1.default.find({ warehouseId: warehouseId,
        date: {
            $gte: dateOt,
            $lt: dateFinish
        } });
});
const deleteIncome = (incomeId) => __awaiter(void 0, void 0, void 0, function* () {
    return Income_1.default.remove({ _id: incomeId });
});
const findIncomeById = (incomeId) => __awaiter(void 0, void 0, void 0, function* () {
    return Income_1.default.findOne({ _id: incomeId });
});
module.exports = { createNewIncome, allIncomeByWarehouse, getIncomeByDate, deleteIncome, findIncomeById };
