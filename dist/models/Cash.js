"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const cashSchema = ts_mongoose_1.createSchema({
    idWarehouse: ts_mongoose_1.Type.objectId({ required: true, ref: 'Warehouse' }),
    dateCash: ts_mongoose_1.Type.mixed({ required: true }),
    balanceBeginning: ts_mongoose_1.Type.number({ required: true }),
    balanceEnding: ts_mongoose_1.Type.number({ required: true }),
    changesDay: ts_mongoose_1.Type.number({ required: true }),
    balanceCash: ts_mongoose_1.Type.number({ required: true })
});
const Cash = ts_mongoose_1.typedModel('Cash', cashSchema);
exports.default = Cash;
