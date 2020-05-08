"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const cashlessSchema = ts_mongoose_1.createSchema({
    idWarehouse: ts_mongoose_1.Type.objectId({ required: true, ref: 'Warehouse' }),
    dateCashless: ts_mongoose_1.Type.mixed({ required: true }),
    balanceBeginning: ts_mongoose_1.Type.number({ required: true }),
    balanceEnding: ts_mongoose_1.Type.number({ required: true }),
    changesDay: ts_mongoose_1.Type.number({ required: true }),
    balanceCashless: ts_mongoose_1.Type.number({ required: true })
});
const Cashless = ts_mongoose_1.typedModel('Cashless', cashlessSchema);
exports.default = Cashless;
