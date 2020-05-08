"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const saleSchema = ts_mongoose_1.createSchema({
    warehouse: ts_mongoose_1.Type.objectId({ required: true, ref: 'Warehouse' }),
    date: ts_mongoose_1.Type.mixed({ required: true }),
    updatedDate: ts_mongoose_1.Type.mixed({ require: true }),
    user: ts_mongoose_1.Type.objectId({ required: true, ref: 'User' }),
    allAmount: ts_mongoose_1.Type.number({ required: true }),
    cancellation: ts_mongoose_1.Type.string({ required: true }),
    track: ts_mongoose_1.Type.string(),
    delivered: ts_mongoose_1.Type.boolean(),
    status: ts_mongoose_1.Type.string(),
    client: ts_mongoose_1.Type.objectId({ ref: 'Client' }),
    productsSale: [
        {
            productId: ts_mongoose_1.Type.objectId({ required: true, ref: 'Product' }),
            name: ts_mongoose_1.Type.string({ required: true }),
            count: ts_mongoose_1.Type.number({ required: true }),
            pricePurchase: ts_mongoose_1.Type.number({ required: true }),
            priceSale: ts_mongoose_1.Type.number({ required: true }),
            amount: ts_mongoose_1.Type.number({ required: true }),
            discount: ts_mongoose_1.Type.number(),
            discountAmount: ts_mongoose_1.Type.number()
        }
    ]
});
const Sale = ts_mongoose_1.typedModel('Sale', saleSchema);
exports.default = Sale;
