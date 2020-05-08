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
const Expenses_1 = __importDefault(require("../../models/Expenses"));
const date_service_1 = __importDefault(require("./date.service"));
const createNewExpense = (expense) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Expenses_1.default.create(expense);
});
const allExpenseByWarehouse = (warehouseId) => __awaiter(void 0, void 0, void 0, function* () {
    return Expenses_1.default.find({ warehouseId: warehouseId }).populate('author', 'surname name').populate('stateExpense', 'name').sort({ $natural: -1 });
});
const getExpensesByDate = (warehouseId, date) => __awaiter(void 0, void 0, void 0, function* () {
    let dateOt = new Date(date.dateOt).toISOString();
    let dateDo = date.dateDo;
    const dateFinish = date_service_1.default.dateForSearch(dateDo);
    return Expenses_1.default.find({ warehouseId: warehouseId,
        date: {
            $gte: dateOt,
            $lt: dateFinish
        } });
});
const deleteExpense = (expenseId) => __awaiter(void 0, void 0, void 0, function* () {
    return Expenses_1.default.remove({ _id: expenseId });
});
const findExpenseById = (expenseId) => __awaiter(void 0, void 0, void 0, function* () {
    return Expenses_1.default.findOne({ _id: expenseId });
});
module.exports = { createNewExpense, allExpenseByWarehouse, getExpensesByDate, deleteExpense, findExpenseById };
