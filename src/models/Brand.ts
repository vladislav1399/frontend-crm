import {createSchema, Type, typedModel} from "ts-mongoose";

const brandSchema = createSchema({
        name: Type.string({required: true, index: {unique: true}})
});

const Brand = typedModel('Brand', brandSchema);
export default Brand
