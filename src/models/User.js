"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const userSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string({ required: true }),
    surname: ts_mongoose_1.Type.string({ required: true }),
    phone: ts_mongoose_1.Type.string({ required: true, unique: true }),
    password: ts_mongoose_1.Type.string({ required: true }),
    accessUser: ts_mongoose_1.Type.objectId({ required: true, ref: 'Professions' }),
    workWarehouse: ts_mongoose_1.Type.objectId({ ref: 'Warehouse' }),
    photoUser: ts_mongoose_1.Type.string(),
    salary: ts_mongoose_1.Type.number(),
    saleAmountInMonth: ts_mongoose_1.Type.number({ required: true, default: 0 }),
    allSaleAmount: ts_mongoose_1.Type.number({ required: true, default: 0 }),
});
const User = ts_mongoose_1.typedModel('User', userSchema);
exports.default = User;
