"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const supplierSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string({ required: true }),
    surname: ts_mongoose_1.Type.string({ required: true }),
    contact: ts_mongoose_1.Type.string({ required: true }),
    contactTwo: ts_mongoose_1.Type.string({ required: true }),
    postTown: ts_mongoose_1.Type.string({ required: true }),
    amount: ts_mongoose_1.Type.number({ default: 0 }),
    brands: [{
            brandName: ts_mongoose_1.Type.string({ required: true }),
            id: ts_mongoose_1.Type.objectId({ required: true, ref: 'Brand' })
        }],
    review: [{
            text: ts_mongoose_1.Type.string({ required: true }),
            date: ts_mongoose_1.Type.mixed({ required: true })
        }]
});
const Supplier = ts_mongoose_1.typedModel('Supplier', supplierSchema);
exports.default = Supplier;
