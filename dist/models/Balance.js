"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const BalanceSchema = ts_mongoose_1.createSchema({
    barCode: ts_mongoose_1.Type.number({ required: true }),
    productId: ts_mongoose_1.Type.objectId({ required: true, ref: 'Product' }),
    leftovers: [
        {
            idWarehouse: ts_mongoose_1.Type.objectId({ required: true, ref: 'Warehouse' }),
            balance: ts_mongoose_1.Type.number({ required: true })
        }
    ]
});
const Balance = ts_mongoose_1.typedModel('Balance', BalanceSchema);
exports.default = Balance;
