import {createSchema, Type, typedModel} from "ts-mongoose";

const purchaseSchema =  createSchema({
    warehouseId: Type.objectId({required: true, ref: 'Warehouse'}),
    date: Type.mixed({required: true}),
    updatedDate: Type.mixed({require: true}),
    user: Type.objectId({required: true, ref: 'User'}),
    allAmount: Type.number({required: true}),
    cancellation: Type.string({required: true}),
    track: Type.string({default: 'ТТН еще не вводилась'}),
    supplier: Type.objectId({required: true, ref: 'Supplier'}),
    status: Type.string({default: 'Запланирован', required: true}),
    productPurchase: [
        {
            productId: Type.objectId({required: true, ref: 'Product'}),
            name: Type.string({required: true}),
            count: Type.number({required: true}),
            pricePurchase: Type.number({required: true}),
            amount: Type.number({required: true}),
        }
    ]
});
const Purchase = typedModel('Purchase', purchaseSchema);

export default Purchase


