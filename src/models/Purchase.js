"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const purchaseSchema = ts_mongoose_1.createSchema({
    warehouseId: ts_mongoose_1.Type.objectId({ required: true, ref: 'Warehouse' }),
    date: ts_mongoose_1.Type.mixed({ required: true }),
    updatedDate: ts_mongoose_1.Type.mixed({ require: true }),
    user: ts_mongoose_1.Type.objectId({ required: true, ref: 'User' }),
    allAmount: ts_mongoose_1.Type.number({ required: true }),
    cancellation: ts_mongoose_1.Type.string({ required: true }),
    track: ts_mongoose_1.Type.string({ default: 'ТТН еще не вводилась' }),
    supplier: ts_mongoose_1.Type.objectId({ required: true, ref: 'Supplier' }),
    status: ts_mongoose_1.Type.string({ default: 'Запланирован', required: true }),
    productPurchase: [
        {
            productId: ts_mongoose_1.Type.objectId({ required: true, ref: 'Product' }),
            name: ts_mongoose_1.Type.string({ required: true }),
            count: ts_mongoose_1.Type.number({ required: true }),
            pricePurchase: ts_mongoose_1.Type.number({ required: true }),
            amount: ts_mongoose_1.Type.number({ required: true }),
        }
    ]
});
const Purchase = ts_mongoose_1.typedModel('Purchase', purchaseSchema);
exports.default = Purchase;
