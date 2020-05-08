"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_mongoose_1 = require("ts-mongoose");
const categorySchema = ts_mongoose_1.createSchema({
    name: ts_mongoose_1.Type.string({ required: true, index: { unique: true } }),
    parentCategories: [{
            nameParent: ts_mongoose_1.Type.string(),
            parent: ts_mongoose_1.Type.mixed()
        }],
});
const Category = ts_mongoose_1.typedModel('Category', categorySchema);
exports.default = Category;
