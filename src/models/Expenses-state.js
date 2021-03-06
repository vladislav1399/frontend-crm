"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const expensesStateSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string({ required: true, index: { unique: true } })
});
const ExpensesState = ts_mongoose_1.typedModel('ExpensesState', expensesStateSchema);
exports.default = ExpensesState;
