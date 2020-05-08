import {createSchema, Type, typedModel} from "ts-mongoose";
const BalanceSchema =  createSchema({
        barCode: Type.number({required: true}),
        productId: Type.objectId({required: true, ref: 'Product'}),
        leftovers: [
            {
                idWarehouse: Type.objectId({required: true, ref: 'Warehouse'}),
                balance: Type.number({required: true})
            }
        ]
});
const Balance = typedModel('Balance', BalanceSchema);

export default Balance


