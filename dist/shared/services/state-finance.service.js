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
const Expenses_state_1 = __importDefault(require("../../models/Expenses-state"));
const Income_state_1 = __importDefault(require("../../models/Income-state"));
const createStateExpenses = (state) => __awaiter(void 0, void 0, void 0, function* () {
    return Expenses_state_1.default.create(state);
});
const getStateExpenses = () => __awaiter(void 0, void 0, void 0, function* () {
    return Expenses_state_1.default.find();
});
const createStateIncome = (state) => __awaiter(void 0, void 0, void 0, function* () {
    return Income_state_1.default.create(state);
});
const getStateIncome = () => __awaiter(void 0, void 0, void 0, function* () {
    return Income_state_1.default.find();
});
const deleteIncomeState = (stateId) => {
    return Income_state_1.default.remove({ _id: stateId });
};
const deleteExpenseState = (stateId) => {
    return Expenses_state_1.default.remove({ _id: stateId });
};
module.exports = { createStateExpenses, createStateIncome, getStateIncome, getStateExpenses, deleteExpenseState, deleteIncomeState };
