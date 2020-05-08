"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const expensesSchema = ts_mongoose_1.createSchema({
    date: ts_mongoose_1.Type.mixed({ required: true }),
    author: ts_mongoose_1.Type.objectId({ required: true, ref: 'User' }),
    warehouseId: ts_mongoose_1.Type.objectId({ required: true, ref: 'Warehouse' }),
    stateExpense: ts_mongoose_1.Type.objectId({ required: true, ref: 'ExpensesState' }),
    cancellation: ts_mongoose_1.Type.string({ required: true }),
    value: ts_mongoose_1.Type.number({ required: true }),
    description: ts_mongoose_1.Type.string({ required: true })
});
const Expense = ts_mongoose_1.typedModel('Expenses', expensesSchema);
exports.default = Expense;
