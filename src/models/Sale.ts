import {createSchema, Type, typedModel} from "ts-mongoose";

const saleSchema =  createSchema({
    warehouse: Type.objectId({required: true, ref: 'Warehouse'}),
    date: Type.mixed({required: true}),
    updatedDate: Type.mixed({require: true}),
    user: Type.objectId({required: true, ref: 'User'}),
    allAmount: Type.number({required: true}),
    cancellation: Type.string({required: true}),
    track: Type.string(),
    delivered: Type.boolean(),
    status: Type.string(),
    client: Type.objectId({ref: 'Client'}),
    productsSale: [
        {
            productId: Type.objectId({required: true, ref: 'Product'}),
            name: Type.string({required: true}),
            count: Type.number({required: true}),
            pricePurchase: Type.number({required: true}),
            priceSale: Type.number({required: true}),
            amount: Type.number({required: true}),
            discount: Type.number(),
            discountAmount: Type.number()
        }
    ]
});
const Sale = typedModel('Sale', saleSchema);

export default Sale


