"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const productSchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string({ required: true, index: { unique: true } }),
    category: ts_mongoose_1.Type.objectId({ required: true }),
    barCode: ts_mongoose_1.Type.number({ index: { unique: true } }),
    salePrice: ts_mongoose_1.Type.number({ required: true }),
    purchasePrice: ts_mongoose_1.Type.number({ required: true }),
    brand: ts_mongoose_1.Type.objectId({ ref: 'Brand' }),
    photo: ts_mongoose_1.Type.string(),
    description: ts_mongoose_1.Type.string(),
    minSalePrice: ts_mongoose_1.Type.number(),
    dateCreate: ts_mongoose_1.Type.mixed({ required: true }),
    dateLastUpdate: ts_mongoose_1.Type.mixed({ required: true }),
});
const Product = ts_mongoose_1.typedModel('Product', productSchema);
exports.default = Product;
