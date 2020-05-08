import {createSchema, Type, typedModel} from "ts-mongoose";

const categorySchema = createSchema({
    name: Type.string({required: true, index: {unique: true}}),
    parentCategories: [{
        nameParent: Type.string(),
        parent: Type.mixed()
    }],
});

const Category = typedModel('Category', categorySchema);
export default Category

