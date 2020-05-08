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
const state_finance_service_1 = __importDefault(require("../shared/services/state-finance.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const createStateIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newStateIncome = {
        name: req.body.name
    };
    yield state_finance_service_1.default.createStateIncome(newStateIncome).then(state => {
        res.status(200).json(message_service_1.default.sendMessage(true, `Статья прихода ${req.body.name} успешно создана`));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const createStateExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newStateExpenses = {
        name: req.body.name
    };
    yield state_finance_service_1.default.createStateExpenses(newStateExpenses).then(state => {
        res.status(200).json(message_service_1.default.sendMessage(true, `Статья расхода ${req.body.name} успешно создана`));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const getAllStateIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield state_finance_service_1.default.getStateIncome().then(state => {
        res.status(200).json(state);
    }).catch(e => console.log(e.message));
});
const getAllStateExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield state_finance_service_1.default.getStateExpenses().then(state => {
        res.status(200).json(state);
    }).catch(e => console.log(e.message));
});
const removeStateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    state_finance_service_1.default.deleteExpenseState(String(req.params.id)).then((result) => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Статья расхода успешно удалена!'));
    }).catch((e) => {
        res.status(200).json(message_service_1.default.sendMessage(false, e.message));
    });
});
const removeStateIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    state_finance_service_1.default.deleteIncomeState(String(req.params.id)).then((result) => {
        res.status(200).json(message_service_1.default.sendMessage(true, 'Статья прихода успешно удалена!'));
    }).catch((e) => {
        res.status(200).json(message_service_1.default.sendMessage(false, e.message));
    });
});
module.exports = { createStateIncome, createStateExpenses, getAllStateExpenses, getAllStateIncome, removeStateIncome, removeStateExpense };
