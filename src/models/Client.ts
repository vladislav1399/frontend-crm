import {createSchema, Type, typedModel} from "ts-mongoose";

const clientSchema = createSchema({
    name: Type.string(),
    surname: Type.string({ index: {unique: true}}),
    phone: Type.string({required: true, index: {unique: true}}),
    amountPurchase: Type.number({required: true, default: 0}),
    discount: Type.number({required: true, default: 0})
});

const Client = typedModel('Client', clientSchema);
export default Client

