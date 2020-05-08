"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const incomeSchema = ts_mongoose_1.createSchema({
    date: ts_mongoose_1.Type.mixed({ required: true }),
    author: ts_mongoose_1.Type.objectId({ required: true, ref: 'User' }),
    warehouseId: ts_mongoose_1.Type.objectId({ required: true, ref: 'Warehouse' }),
    stateIncome: ts_mongoose_1.Type.objectId({ required: true, ref: 'IncomeState' }),
    cancellation: ts_mongoose_1.Type.string({ required: true }),
    value: ts_mongoose_1.Type.number({ required: true }),
    description: ts_mongoose_1.Type.string({ required: true })
});
//     date: income.dateIncome,
//     author: income.authorIncome,
//     warehouseId: income.warehouseIncome,
//     stateIncome: income.incomeItem,
//     cancellation: нал или безнал,
//     value: income.amountIncome,
const Income = ts_mongoose_1.typedModel('Income', incomeSchema);
exports.default = Income;
