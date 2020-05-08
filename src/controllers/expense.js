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
const expense_service_1 = __importDefault(require("../shared/services/expense.service"));
const date_service_1 = __importDefault(require("../shared/services/date.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const finance_service_1 = __importDefault(require("../shared/services/finance.service"));
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = date_service_1.default.getDateNow();
    const newExpense = req.body;
    newExpense.date = date;
    expense_service_1.default.createNewExpense(newExpense).then(expense => {
        finance_service_1.default.updateCashAndCashless(String(expense.warehouseId), 0 - expense.value, expense.cancellation).then(result => {
            res.status(200).json(message_service_1.default.sendMessage(true, `расход на суму ${expense.value} был успешно добавлен`));
        }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const getExpensesByWarehouse = (req, res) => {
    expense_service_1.default.allExpenseByWarehouse(req.params.id).then(expenses => {
        res.status(200).json(expenses);
    });
};
const getExpensesByDateForWarehouse = (req, res) => {
    let dateOt = req.body.dateOt;
    let dateDo = req.body.dateDo;
    const data = {
        dateOt,
        dateDo
    };
    let warehouseId = req.body.warehouseId;
    expense_service_1.default.getExpensesByDate(warehouseId, data).then(expenses => {
        res.status(200).json(expenses);
    }).catch(e => res.status(200).json(e.message));
};
const removeExpense = (req, res) => {
    expense_service_1.default.findExpenseById(req.params.id).then(expense => {
        if (!expense) {
        }
        else {
            expense_service_1.default.deleteExpense(req.params.id).then(result => {
                finance_service_1.default.updateCashAndCashless(String(expense.warehouseId), expense.value, expense.cancellation).then(result => {
                    console.log(result);
                    res.status(200).json(message_service_1.default.sendMessage(true, 'Расход успешно удален!'));
                });
            }).catch(e => console.log(e));
        }
    });
};
module.exports = { createExpense, getExpensesByWarehouse, getExpensesByDateForWarehouse, removeExpense };
