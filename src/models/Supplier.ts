import {createSchema, Type, typedModel} from "ts-mongoose";

const supplierSchema = createSchema({
    name: Type.string({required: true}),
    surname: Type.string({required: true}),
    contact: Type.string({required: true}),
    contactTwo: Type.string({required: true}),
    postTown: Type.string({required: true}),
    amount: Type.number({default: 0}),
    brands:  [{
        brandName: Type.string({required: true}),
        id: Type.objectId({required: true, ref: 'Brand'})
    }],
    review: [{
        text: Type.string({required: true}),
        date: Type.mixed({required: true})
        }]
});
const Supplier = typedModel('Supplier', supplierSchema);

export default Supplier


