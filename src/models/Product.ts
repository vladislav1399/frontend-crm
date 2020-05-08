import {createSchema, Type, typedModel} from "ts-mongoose";

const productSchema = createSchema({
    name: Type.string({required: true, index: {unique: true}}),
    category: Type.objectId({required: true}),
    barCode: Type.number({index: {unique: true}}),
    salePrice: Type.number({required: true}),
    purchasePrice: Type.number({required: true}),
    brand: Type.objectId({ref: 'Brand'}),
    photo: Type.string(),
    description: Type.string(),
    minSalePrice: Type.number(),
    dateCreate: Type.mixed({required: true}),
    dateLastUpdate: Type.mixed({required: true}),
});

const Product = typedModel('Product', productSchema);

export default Product
