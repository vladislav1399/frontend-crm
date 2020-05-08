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
const income_service_1 = __importDefault(require("../shared/services/income.service"));
const date_service_1 = __importDefault(require("../shared/services/date.service"));
const message_service_1 = __importDefault(require("../shared/services/message.service"));
const finance_service_1 = __importDefault(require("../shared/services/finance.service"));
const createIncome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = date_service_1.default.getDateNow();
    const newIncome = req.body;
    newIncome.date = date;
    income_service_1.default.createNewIncome(newIncome).then(income => {
        finance_service_1.default.updateCashAndCashless(String(income.warehouseId), income.value, income.cancellation).then(result => {
            res.status(200).json(message_service_1.default.sendMessage(true, `приход на суму ${income.value} был успешно добавлен`));
        }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
});
const getIncomeByWarehouse = (req, res) => {
    income_service_1.default.allIncomeByWarehouse(req.params.id).then(incomes => {
        res.status(200).json(incomes);
    });
};
const getIncomeByDateForWarehouse = (req, res) => {
    let dateOt = req.body.dateOt;
    let dateDo = req.body.dateDo;
    const data = {
        dateOt,
        dateDo
    };
    let warehouseId = req.body.warehouseId;
    income_service_1.default.getIncomeByDate(warehouseId, data).then(incomes => {
        res.status(200).json(incomes);
    }).catch(e => res.status(200).json(e.message));
};
const removeIncome = (req, res) => {
    income_service_1.default.findIncomeById(req.params.id).then(income => {
        if (!income) {
        }
        else {
            income_service_1.default.deleteIncome(req.params.id).then(result => {
                finance_service_1.default.updateCashAndCashless(String(income.warehouseId), 0 - income.value, income.cancellation).then(result => {
                    res.status(200).json(message_service_1.default.sendMessage(true, 'Приход успешно удален!'));
                });
            }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
        }
    }).catch(e => res.status(200).json(message_service_1.default.sendMessage(false, e.message)));
};
module.exports = { createIncome, getIncomeByWarehouse, getIncomeByDateForWarehouse, removeIncome };
