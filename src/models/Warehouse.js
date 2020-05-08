"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const warehouseSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string({ required: true, index: { unique: true } }),
});
const Warehouse = ts_mongoose_1.typedModel('Warehouse', warehouseSchema);
exports.default = Warehouse;
