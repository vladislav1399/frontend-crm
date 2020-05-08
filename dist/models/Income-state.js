"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const incomeStateSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string({ required: true, index: { unique: true } })
});
const IncomeState = ts_mongoose_1.typedModel('IncomeState', incomeStateSchema);
exports.default = IncomeState;
