"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const clientSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string(),
    surname: ts_mongoose_1.Type.string({ index: { unique: true } }),
    phone: ts_mongoose_1.Type.string({ required: true, index: { unique: true } }),
    amountPurchase: ts_mongoose_1.Type.number({ required: true, default: 0 }),
    discount: ts_mongoose_1.Type.number({ required: true, default: 0 })
});
const Client = ts_mongoose_1.typedModel('Client', clientSchema);
exports.default = Client;
